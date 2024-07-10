
 import mongoose,{Schema,Document, ObjectId} from "mongoose";

interface Admin extends Document{
    roleId?: Schema.Types.ObjectId[];
    userId:Schema.Types.ObjectId;
    schoolId:Schema.Types.ObjectId;
    permission?:String;
}

const adminSchema:Schema<Admin>=new Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    schoolId:{type:mongoose.Schema.Types.ObjectId,ref:"school"},
    permission:{
        type:String,
    },
    roleId:{
        type:[mongoose.Schema.Types.ObjectId],ref:"admin",default:[]
    }
})

const AdminModel = mongoose.model("admin",adminSchema)

export {AdminModel} 