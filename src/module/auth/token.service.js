import { createHash, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const signAccessToken = (user) => {
  const payload = {
    sub: user._id.toString(),
    role: user.role,
    jti: randomBytes(16).toString("hex"),
  };

  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
};

export const createRefreshToken = (user) => {
  const token = jwt.sign(
    {
      sub: user._id.toString(),
      jti: randomBytes(16).toString("hex"),
    },
    env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    tokenHash: createHash("sha256").update(token).digest("hex"),
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
  };
};