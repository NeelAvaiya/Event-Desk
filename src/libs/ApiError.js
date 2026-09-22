export class AppError extends Error {
  constructor(code, statusCode = 400, details = null) {
    super(code);

    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;

    Error.captureStackTrace?.(this, AppError);
  }
}