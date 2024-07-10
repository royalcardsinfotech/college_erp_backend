import mongoose,{Schema,Document} from "mongoose";
import { Medium, MediumSchema, OptionalSubGrp, OptionalSubGrpSchema, SubjectDef, 
    SubjectDefSchema, SubjectGrp, SubjectGrpSchema, SubjectType, SubjectTypeSchema } from "../utils/subject-interface";

interface SubjectConfig extends Document{
    schoolId:mongoose.Schema.Types.ObjectId;
    medium:Medium[];
    subType:SubjectType[];
    subDef:SubjectDef[];
    subGrp:SubjectGrp[];
    optionalSubGrp:OptionalSubGrp[];
}

const subSchema:Schema<SubjectConfig> =new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref:"school"
    }
    ,
    medium:{
        type:[MediumSchema],
        default:[]
    }
    ,
    subType:{
        type:[SubjectTypeSchema],
        default:[]
    }
    ,
    subDef:{
        type:[SubjectDefSchema],
        default:[]
    }
    ,
    subGrp:{
        type:[SubjectGrpSchema],
        default:[]
    }
    ,
    optionalSubGrp:{
        type:[OptionalSubGrpSchema],
        default:[]
    }
})

const SubModel=mongoose.model("subject",subSchema)
export {SubModel,SubjectConfig}