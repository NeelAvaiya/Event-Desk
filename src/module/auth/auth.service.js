import argon2 from "argon2";
import { AppError } from "../../libs/ApiError.js";

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