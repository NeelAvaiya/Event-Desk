import argon2 from "argon2";
import { AppError } from "../../libs/ApiError.js";
import { createRefreshToken, signAccessToken } from "./token.service.js";

export const hashPassword = (plain) => argon2.hash(plain, {
  type: argon2.argon2id, memoryCost: 1946, timeCost: 2, parallelism: 1,
});

export const verifyPassword = (hash, plain) => argon2.verify(hash, plain);

export const registerUser = async (userModel, userData) => {
  const { name, email, password } = userData;

  // Never store plaintext password
  const passwordHash = await hashPassword(password);

  const newUser = new userModel({
    name,
    email,
    passwordHash,
  });

  try {
    await newUser.save();
  } catch (error) {
    // Database is the final authority for uniqueness
    if (error.code === 11000) {
      throw new AppError("Email already registered", 409);
    }

    throw error;
  }

  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    createdAt: newUser.createdAt,
  };
};

export const loginUser = async (userModel, refreshTokenModel, userData) => {
  const user = await userModel
    .findOne({ email: userData.email })
    .select("+passwordHash");

  if (!user || !(await verifyPassword(user.passwordHash, userData.password))) {
    throw new AppError("INVALID_CREDENTIALS", 401);
  }

  const refreshToken = createRefreshToken(user);
  const accessToken = signAccessToken(user);

  await refreshTokenModel.create({
    userId: user._id,
    tokenHash: refreshToken.tokenHash,
    expiresAt: refreshToken.expiresAt,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken: refreshToken.token,
    refreshTokenExpiresAt: refreshToken.expiresAt,
  };
};