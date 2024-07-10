
import mongoose,{Schema,Document} from "mongoose";
import { ExamMapping, ExamMappingSchema, QualifyingExam, QualifyingExamSchema, QualifyingSemester, QualifyingSemesterSchema, QualifyingSubject, QualifyingSubjectSchema, Stream, StreamSchema } from "../utils/qualifyingExam-interfaces";

export interface QualifyingExamConfig extends Document{
    schoolId:mongoose.Schema.Types.ObjectId;
    exam:QualifyingExam[];
    stream:Stream[];
    subject:QualifyingSubject[];
    semester:QualifyingSemester[];
    mapping:ExamMapping[]
}

const qExamSch:Schema<QualifyingExamConfig>=new Schema({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref:"school"
    },
    exam:{
        type:[QualifyingExamSchema],
        default:[]
    },
    stream:{
        type:[StreamSchema],
        default:[]
    },
    subject:{
        type:[QualifyingSubjectSchema],
        default:[]
    },
    semester:{
        type:[QualifyingSemesterSchema],
        default:[]
    },
    mapping:{
        type:[ExamMappingSchema],
        default:[]
    }
})

export const QExamModel=mongoose.model("qexamconfig",qExamSch)

