import e from "express";
import mongoose,{Schema,Document} from "mongoose";

export interface CandidatureType extends Document{
    courselvl:String;
    type:String;
    active:Boolean;
}
export const CandidatureTypeSchema: Schema<CandidatureType> = new Schema({
    courselvl: { type: String, required: true },
    type: { type: String, required: true },
    active: { type: Boolean, required: true }
})

export interface DTEMaster extends Document{
    fieldName:String;
    fieldType:String;
    active:Boolean;
}

export const DTEMasterSchema: Schema<DTEMaster> = new Schema({
    fieldName: { type: String, required: true },
    fieldType: { type: String, required: true },
    active: { type: Boolean, required: true }
})

export interface EnExam extends Document{
    courselvl:String;
    exam:String;
    examType:String;
    active:Boolean;
}
export const enexamsch: Schema<EnExam> = new Schema({
    courselvl: { type: String, required: true },
    exam: { type: String, required: true },
    examType: { type: String, required: true },
    active: { type: Boolean, required: true }
}) 

export interface EnSubject extends Document{
    courselvl:String;
    exam:String;
    subjectType:String;
    name:String;
    active:Boolean;
    optional:Boolean;
    valid:Boolean;
    validationlimit?:Number
}

export const EntranceSubjectSchema: Schema<EnSubject> = new Schema({
    courselvl: { type: String, required: true },
    exam: { type: String, required: true },
    subjectType: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    optional: { type: Boolean, required: true },
    valid: { type: Boolean, required: true },
    validationlimit:{
        type:Number
    }
})