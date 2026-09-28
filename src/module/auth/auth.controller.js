import User from "../user/user.model.js";
import { registerUser } from "./auth.service.js";

export const register = async (req, res) => {
	const user = await registerUser(User, res.locals.body);

	res.status(201).json({
		success: true,
		data: user,
	});
};
