import { Request } from "express";
import { ZodError, ZodSchema } from "zod";
import { validationSchemaMap, ValidationTypes } from "../schemas/schemaRegistry.js";

export const validateRequestBody = (
  validationType: "creation" | "update",
  whatToValidate: ValidationTypes,
  req: Request
): void => {
  try {
    const baseSchema = validationSchemaMap[whatToValidate];

    const schema: ZodSchema =
      validationType === "creation"
        ? baseSchema
        : baseSchema.partial().optional();

    schema.parse(req.body);
  } catch (err) {
    if (err instanceof ZodError) {
      const message = err.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");

      throw new Error(`Validation failed: ${message}`);
    }

    throw new Error(
      `Unknown error during ${whatToValidate} validation. Please check your values.`
    );
  }
};
