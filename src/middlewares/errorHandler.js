import { AppError } from "../libs/ApiError.js";
import { logger } from "../config/logger.js";

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        details: err.details,
      },
    });
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      error: {
        code: "DUPLICATE",
      },
    });
  }

  logger.error(
    {
      err,
      path: req.path,
    },
    "Unhandled error",
  );

  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
    },
  });
}