import { Request } from "express";
import { ZodError, ZodSchema } from "zod";
import { validationSchemaMap, ValidationTypes } from "./schemaRegistry";

export const validateRequestBody = (
  validationType: "creation" | "update",
  whatToValidate: ValidationTypes,
  req: Request
): void => {
  try {
    const baseSchema = validationSchemaMap[whatToValidate];

    const schema: ZodSchema =
      validationType === "creation"
        ? baseSchema.strip()
        : baseSchema.partial().optional();

    schema.parse(req.body);
  } catch (err) {
  if (err instanceof ZodError) {
    const formatted = err.issues.map((issue) => {
      const path = issue.path.join('.');
      return `→ ${path || 'root'}: ${issue.message}`;
    }).join('\n');

    throw new Error(`Validation failed:\n${formatted}`);
  }

  throw new Error(
    `Unknown error during ${whatToValidate} validation. Please check your values.`
  );
  }}
