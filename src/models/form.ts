import mongoose,{Schema,Document, ObjectId} from "mongoose";

interface Form extends Document{
    name:String;
    startDate:Date;
    lastDate:Date;
    field:mongoose.Types.ObjectId[];
}

const formSchema:Schema<Form> =new Schema({
    name:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    lastDate:{
        type:Date,
        required:true
    },
    field:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[]
    }
},{timestamps:true})

const FormModel=mongoose.model("form",formSchema)

export {FormModel}