import { Response } from "express";

export const sendError = (
  status: number,
  message: string,
  error: unknown,
  res: Response
): void => {
  res.status(status).json({
    error: message,
    details: error instanceof Error ? error.message : "Unknown error occurred",
    errObject: error,
  });
};
