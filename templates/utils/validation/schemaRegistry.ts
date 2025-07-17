<<<<<<< HEAD
// This file will load validation schemas from their respective modules

export const validationSchemaMap = {
  //Register your validation schemas here
=======
import { userLoginSchema, userSchema } from "../../modules/auth/user.schema";

export const validationSchemaMap = {
  "user" : userSchema,
  "user-login": userLoginSchema,
>>>>>>> 9f73d6861e70152d6afc8756db7b1ba590f47b3a
};

export type ValidationTypes = keyof typeof validationSchemaMap;
