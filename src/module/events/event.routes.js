import express from "express";

import * as eventController from "./event.controller.js";
import {
  listEventsQuerySchema,
  eventSlugParamsSchema,
} from "./event.validator.js";

import { validate } from "../../middlewares/validate.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

const router = express.Router();

router.get(
  "/",
  validate({
    query: listEventsQuerySchema,
  }),
  asyncHandler(eventController.list)
);

router.get(
  "/:slug",
  validate({
    params: eventSlugParamsSchema,
  }),
  asyncHandler(eventController.detail)
);

export default router;