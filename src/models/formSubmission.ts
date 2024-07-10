
import mongoose,{Schema,Document} from "mongoose";
import { Address, Education, PersonalInfo, Upload, addSch, eduSch, perSchema, uploadSch } from "../utils/filesubmission-interfaces";

interface Application extends Document{
    userId:Schema.Types.ObjectId;
    applicationNo:String;
    confirmed:Boolean;
    locked:Boolean;
    paymentStatus:Number;
    status?:String;
    schoolId:Schema.Types.ObjectId;
    personal?:PersonalInfo;
    course?:String;
    courselvl:String;
    address?:Address;
    session:String;
    uploads?:Upload[];
    subDate?:String;
    paymentId?:Schema.Types.ObjectId
    // last_qualifying?:;
    // nep_subject?:;
    // subject?:;
    // documents?:;
    // confirm_registration?:;
    // course_selection?:;
    // course_question?:;
    education?:Education[];
    // entrance_exam?:;
    // question?:;
    // custom_last_qualifying?:;
}

const appliSchema:Schema<Application>=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    course:{
        type:String
    },
    courselvl:{
        type:String
    },
    confirmed:{
        type:Boolean,
        default:false
    },
    locked:{
        type:Boolean,
        default:true
    },
    paymentStatus:{
        type:Number,
        default:-1
    },
    schoolId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"school"
    },personal:{
        type:perSchema
    },
    uploads:{
        type:[uploadSch],
        default:[]
    },
    address:{
        type:addSch
    },
    education:{
        type:[eduSch],
        default:[]
    },
    subDate:String,
    status:{type:String,default:"INCOMP"},
    applicationNo:String,
    paymentId:{
        type:String,
        ref:"payment"
    },
    session:String
},{
    timestamps:true
})

const AppliModel=mongoose.model("application",appliSchema)

export {AppliModel,Application}