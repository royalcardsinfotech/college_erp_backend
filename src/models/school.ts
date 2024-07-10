import e from "express";
import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface FormPages extends Document {
  name: String;
  required: Boolean;
}

const formPagesSchema: Schema<FormPages> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: true,
    },
  },
);

interface Subject extends Document {
  name: String;
  compulsory: Boolean;
}
interface SubjectGrp extends Document {
  course: String;
  subjects:Subject[];
}
const subjectSchema: Schema<Subject> = new Schema(  
  {
    name: {
      type: String,
      required: true,
    },
    compulsory: {
      type: Boolean,
      required: true,
    },
  },
);
const subjectGrpSchema: Schema<SubjectGrp> = new Schema(
  {
    course: {
      type: String,
      required: true,
    },
    subjects: {
      type: [subjectSchema],
      default: [],
    },
  },
);

 
interface School extends Document {
  name: String;
  school_code: String;
  email?: String;
  phone: String[];
  logoUrl?:String;
  photos:String[];
  _id: mongoose.Schema.Types.ObjectId;
  courselvls:String[];
  
  entranceExamType:String[];  
  dteFieldType:String[];
  subjectgrps:SubjectGrp[];
}

const schoolschema: Schema<School> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    school_code: {
      type: String,
      required: true,
    },
    phone:{
      type:[String],
      default:[]
    },
    photos:{
      type:[String],
      default:[]
    },
    email:String,
    logoUrl:String,
    courselvls:{
      type:[String],
      default:[]
    },
    entranceExamType:{
      type:[String],
      default:[]
    },
    dteFieldType:{  
      type:[String],
      default:[]
    },
    subjectgrps:{
      type:[subjectGrpSchema],
      default:[]
    },
    
    
  },
  { timestamps: true }
);

const SchoolModel = mongoose.model<School>("school", schoolschema);
export { SchoolModel };
