import User from "../user/user.model.js";
import RefreshToken from "./refreshToken.model.js";
import { env } from "../../config/env.js";
import { loginUser, registerUser } from "./auth.service.js";

export const register = async (req, res) => {
	const user = await registerUser(User, res.locals.body);

	res.status(201).json({
		success: true,
		data: user,
	});
};

export const login = async (req, res) => {
	const result = await loginUser(User, RefreshToken, res.locals.body);

	res.cookie("refreshToken", result.refreshToken, {
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/api/v1/auth",
		expires: result.refreshTokenExpiresAt,
	});

	res.json({
		success: true,
		data: {
			user: result.user,
			accessToken: result.accessToken,
		},
	});
};
