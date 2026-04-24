import crypto from "crypto";
import { AUTH_SECRET, TOKEN_EXPIRY_SECONDS } from "./constants.js";

function toBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value) {
  return Buffer.from(value, "base64url").toString("utf-8");
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function signToken(payloadBase64) {
  return crypto.createHmac("sha256", AUTH_SECRET).update(payloadBase64).digest("base64url");
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  const [salt, originalHash] = (storedHash || "").split(":");
  if (!salt || !originalHash) {
    return false;
  }

  const computedHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return safeCompare(originalHash, computedHash);
}

export function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY_SECONDS,
  };

  const payloadBase64 = toBase64Url(JSON.stringify(payload));
  const signature = signToken(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

export function verifyToken(token) {
  try {
    const [payloadBase64, signature] = (token || "").split(".");
    if (!payloadBase64 || !signature) {
      return null;
    }

    const expectedSignature = signToken(payloadBase64);
    if (!safeCompare(signature, expectedSignature)) {
      return null;
    }

    const payload = JSON.parse(fromBase64Url(payloadBase64));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send({ error: "Missing or invalid authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).send({ error: "Invalid or expired token" });
    return;
  }

  req.user = {
    id: payload.sub,
    username: payload.username,
  };

  next();
}
