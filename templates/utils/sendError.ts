import { Response } from "express";

type ValidErrorStatuses = 404 | 400 | 500 | 403 | 401 

export const sendError = (
  status: ValidErrorStatuses,
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
