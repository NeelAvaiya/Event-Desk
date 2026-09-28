import express from "express";
import * as authController from "./auth.controller.js";
import { loginBodySchema, registerBodySchema } from "./auth.validator.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { validate } from "../../middlewares/validate.js";

const router = express.Router();

router.post(
  "/register",
  validate({ body: registerBodySchema }),
  asyncHandler(authController.register)
);

router.post(
  "/login",
  validate({ body: loginBodySchema }),
  asyncHandler(authController.login)
);

export default router;