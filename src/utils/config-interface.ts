import mongoose, { Document, Schema } from "mongoose";

interface Dateconfig extends Document {
  courselvl: String;
  basicCourse: String;
  course: String[];
  startDate: String;
  endDate: String;
  startTime: String;
  endTime: String;
  serialNo?: Number;
  active: Boolean;
  import: Boolean;
}

const DateconfigSchema: Schema<Dateconfig> = new Schema({
  courselvl: { type: String, required: true },
  basicCourse: { type: String, required: true },
  course: { type: [String], default: [], required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  serialNo: { type: Number },
  active: { type: Boolean, default: true },
  import: { type: Boolean, default: false },
});

  interface RegistrationConfig extends Document{
    courselvl:String;
    session:String;
    isNEP:Boolean;
    subConfig:String;
    localLang:String;
    maxPrefernce:Number;
    maxSub:Number;
    homePageHeader?:String;
    paymentMode:String;
    course:String;
    termsAndConditions?:String;
  }

interface PageConfig extends Document {
  courselvl: String;
  pages: String[];
  course?: String[];
}

interface Field {
  name: String;
  mandatory: Boolean;
  on: Boolean;
  fieldName: String;
}

interface FieldConfig extends Document {
  page: String;
  courselvl: String;
  course?: String;
  fields: Field[];
}

interface CourseDocConfig extends Document {
  document: String;
  course: String[];
  mandatory: Boolean;
  docHide: Boolean;
  active: Boolean;
}

interface FieldDocConfig extends Document{
  courselvl:String;
  page:String;
  field:String;
  doc:String;
  active:Boolean
}

interface AppliNoConfig extends Document {
  session: String;
  course: String;
  prefix?: String;
  startNo?: Number;
}

const RegistrationConfigSchema: Schema<RegistrationConfig> = new Schema({
  courselvl: { type: String, required: true },
  session: { type: String, required: true },
  isNEP: { type: Boolean, required: true },
  subConfig: { type: String, required: true },
  localLang: { type: String, required: true },
  maxPrefernce: { type: Number, required: true },
  maxSub: { type: Number, required: true },
  homePageHeader: { type: String },
  paymentMode: { type: String, required: true },
  course: { type: [String], default: [], required: true },
  termsAndConditions: { type: String },
});

// PageConfig Schema
const PageConfigSchema: Schema<PageConfig> = new Schema({
  courselvl: { type: String, required: true },
  pages: { type: [String], required: true },
  course: { type: [String] },
});

// Field Schema
const FieldSchema: Schema<Field> = new Schema({
  name: { type: String, required: true },
  mandatory: { type: Boolean, required: true },
  on: { type: Boolean, required: true },
  fieldName: {
    type: String,
    required: true,
  },
});

// FieldConfig Schema
const FieldConfigSchema: Schema = new Schema({
  page: { type: String, required: true },
  courselvl: { type: String, required: true },
  course: { type: String },
  fields: { type: [FieldSchema], default: [] },
});

// DocConfig Schema
const CourseDocConfigSchema: Schema = new Schema({
  document: { type: String, required: true },
  course: { type: [String],default:[], required: true },
  mandatory: { type: Boolean, required: true },
  docHide: { type: Boolean, required: true },
  active: { type: Boolean, required: true },
});
const FieldDocConfigSchema:Schema<FieldDocConfig>=new Schema({
  field:{
    type:String,required:true
  },
  doc:{
    type:String,required:true
  },
  courselvl:{
    type:String,required:true
  },
  page:{
    type:String,required:true
  },
  active: { type: Boolean, required: true },
})

// AppliNoConfig Schema
const AppliNoConfigSchema: Schema = new Schema({
  session: { type: String, required: true },
  course: { type: String, required: true },
  prefix: { type: String },
  startNo: { type: Number },
});

export {
  Dateconfig,
  DateconfigSchema,
  FieldConfig,
  PageConfig,
  RegistrationConfig,
  CourseDocConfig,
  AppliNoConfig,
  AppliNoConfigSchema,
  PageConfigSchema,
  RegistrationConfigSchema,
  CourseDocConfigSchema,
  FieldConfigSchema,
  FieldDocConfig,
  FieldDocConfigSchema
};
