import { model } from "mongoose";
import { userSchema } from "./user.schema.ts";
import type { IUserDocument } from "./user.types.ts";


const UserModel = model<IUserDocument>("User", userSchema);
export default UserModel;
