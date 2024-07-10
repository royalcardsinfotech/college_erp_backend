import mongoose,{Schema,Document} from "mongoose";
import { CandidatureType, CandidatureTypeSchema, DTEMaster, DTEMasterSchema, EnSubject, EntranceSubjectSchema, enexamsch } from "../utils/entranceExam-interfaces";


export interface EntranceExam extends Document{
    schoolId:mongoose.Schema.Types.ObjectId;
    candidatureType:CandidatureType[];
    dteMaster:DTEMaster[];
    entranceExam:EntranceExam[];
    entranceSubject:EnSubject[];
    
}

export const EntranceExamSchema: Schema<EntranceExam> = new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref:"school"
    },
    candidatureType: { type: [CandidatureTypeSchema], default:[] },
    dteMaster: { type: [DTEMasterSchema], default: []},
    entranceExam: { type: [enexamsch], default: [] },
    entranceSubject: { type: [EntranceSubjectSchema], default: [] }
})

export const EntaranceConfigModel=mongoose.model<EntranceExam>("entranceConfig",EntranceExamSchema)