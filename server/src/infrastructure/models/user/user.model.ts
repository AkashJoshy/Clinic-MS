import { model } from "mongoose";
import { userSchema } from "./user.schema.ts";
import type { IUserDocument } from "./user.types.ts";
import { MODEL_NAMES } from "../model-names.ts";

const UserModel = model<IUserDocument>(MODEL_NAMES.USER, userSchema);
export default UserModel;
