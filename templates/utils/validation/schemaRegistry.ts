import { userLoginSchema } from "./schemas.";

export const validationSchemaMap = {
  "user-login": userLoginSchema,
};

export type ValidationTypes = keyof typeof validationSchemaMap;
