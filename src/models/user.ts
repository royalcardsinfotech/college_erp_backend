import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  schoolId: Schema.Types.ObjectId;
  address?: String[];
  name: String;
  gender?: String;
  lastlogin?: Number;
  _doc?: any;
  _id: String;
}

const userSchema: Schema<User> = new Schema({
  schoolId: { type: Schema.Types.ObjectId, ref: "school" },
  address: { type: [String],default:[] },
  name: { type: String, required: true },
  gender: { type: String },
  lastlogin: { type: Number },
});

const UserModel = mongoose.model("user", userSchema);
export { UserModel };
