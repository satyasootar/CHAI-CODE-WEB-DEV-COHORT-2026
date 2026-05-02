import Redis from "ioredis";

function createRedisConnection() {
  const redis = new Redis({
    host: "localhost",
    port: 6379,
  });   
  return redis;
}

export const redis = createRedisConnection()

export const publisher = createRedisConnection()

export const subscriber = createRedisConnection()