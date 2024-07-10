import mongoose, { Schema, Document } from "mongoose";

interface Role extends Document {
  description: String;
  role_code: String;
  _id: String;
  schoolId?:Schema.Types.ObjectId;
  active: Boolean;
  allocatedRoles:Map<String,String[]>;
}

const roleSchema: Schema<Role> = new Schema({
  description: String,
  role_code: String,
  schoolId:mongoose.Schema.Types.ObjectId,
  allocatedRoles:{
    type: Map,
    of: [String],
    default:{}
  },
  active:{
    type:Boolean,
    default:true
  }
});

const RoleModel = mongoose.model("role", roleSchema);

export { RoleModel };
