import mongoose, { Schema, Document } from "mongoose";

interface Credential extends Document {
  userId: Schema.Types.ObjectId;
  email: String;
  phone: String;
  password: String;
  loginId?: String;
  active: Boolean;
  _id: String;
}

const credentialSchema: Schema<Credential> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  loginId: { type: String },
  active: { type: Boolean },
});
const CredentialModel = mongoose.model("credential", credentialSchema);
export { CredentialModel };
