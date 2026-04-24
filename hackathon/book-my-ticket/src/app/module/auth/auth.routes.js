import { Router } from "express";
import { pool } from "../../../db/pool.js";
import { generateToken, hashPassword, verifyPassword, authenticate } from "../../common/auth.js";

const authRouter = Router();

authRouter.post("/auth/register", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      res.status(400).send({ error: "username and password are required" });
      return;
    }

    const passwordHash = hashPassword(password);
    const sql = "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username";
    const result = await pool.query(sql, [username.trim(), passwordHash]);
    const user = result.rows[0];
    const token = generateToken(user);

    res.status(201).send({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    if (error.code === "23505") {
      res.status(409).send({ error: "Username already exists" });
      return;
    }

    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

authRouter.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      res.status(400).send({ error: "username and password are required" });
      return;
    }

    const result = await pool.query("SELECT id, username, password_hash FROM users WHERE username = $1", [
      username.trim(),
    ]);

    if (result.rowCount === 0) {
      res.status(401).send({ error: "Invalid credentials" });
      return;
    }

    const userRecord = result.rows[0];
    const isValidPassword = verifyPassword(password, userRecord.password_hash);
    if (!isValidPassword) {
      res.status(401).send({ error: "Invalid credentials" });
      return;
    }

    const user = { id: userRecord.id, username: userRecord.username };
    const token = generateToken(user);

    res.send({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

authRouter.get("/auth/me", authenticate, (req, res) => {
  res.send({ user: req.user });
});

export default authRouter;
