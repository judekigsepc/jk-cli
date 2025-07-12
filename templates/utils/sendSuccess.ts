import { Response } from "express";

export const sendSuccess = <T>(
  status: 200 | 201,
  message: string,
  result: T,
  res: Response
): void => {
  res.status(status).json({ message, result });
};
