import { userLoginSchema, userSchema } from "../../modules/auth/user.schema";
import { addGroupMembersSchema, groupSchema } from "../../modules/groups/group.schemas";

export const validationSchemaMap = {
  "user" : userSchema,
  "user-login": userLoginSchema,
  "group": groupSchema,
  "add-group-members": addGroupMembersSchema
};

export type ValidationTypes = keyof typeof validationSchemaMap;
