import express from "express";
import * as authController from "./auth.controller.js";
import { registerBodySchema } from "./auth.validator.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { validate } from "../../middlewares/validate.js";

const router = express.Router();

router.post(
  "/register",
  validate({ body: registerBodySchema }),
  asyncHandler(authController.register)
);

export default router;