
import { userLoginSchema, userSchema } from "@modules/auth/user.schema";

export const validationSchemaMap = {
  "user" : userSchema,
  "user-login": userLoginSchema,

};

export type ValidationTypes = keyof typeof validationSchemaMap;
