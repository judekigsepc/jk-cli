
import { userLoginSchema, userSchema } from "@modules/users/user.schema";

export const validationSchemaMap = {
  "user" : userSchema,
  "user-login": userLoginSchema,

};

export type ValidationTypes = keyof typeof validationSchemaMap;
