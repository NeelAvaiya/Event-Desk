import { AppError } from "../libs/ApiError.js";

export const validate = (schemas) => (req, res, next) => {
  for (const key of ["body", "query", "params"]) {
    if (!schemas[key]) continue;

    const result = schemas[key].safeParse(req[key]);

    if (!result.success) {
      return next(
        new AppError(
          "VALIDATION_ERROR",
          422,
          result.error.flatten().fieldErrors
        )
      );
    }

    res.locals[key] = result.data;
  }

  next();
};