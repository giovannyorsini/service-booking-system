export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error);

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "Invalid JSON payload",
    });
  }

  const statusCode = error.statusCode || 500;

  const message = error.isOperational ? error.message : "Internal server error";

  return res.status(statusCode).json({
    error: message,
  });
};
