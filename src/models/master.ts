import mongoose, { Document, Schema } from "mongoose";
import {
  BasicCourse,
  BasicCourseSchema,
  Bloodgrp,
  Board,
  BoardSchema,
  CasteCategory,
  CasteCategorySchema,
  CategoryType,
  City,
  CitySchema,
  Country,
  CountrySchema,
  Course,
  CourseSchema,
  Cult,
  District,
  DistrictSchema,
  Doc,
  DocSchema,
  HandCapped,
  IdProof,
  IdProofSchema,
  Occupation,
  PageInstr,
  PageInstrSchema,
  RegFee,
  RegFeeSchema,
  Religion,
  ReligionSchema,
  Session,
  SessionSchema,
  SocialReservation,
  Sport,
  State,
  StateSchema,
  SubCaste,
  SubCasteSchema,
  Title,
  TitleSchema,
  UploadInstr,
  UploadInstrSchema,
  bgSch,
  cultSch,
  handicappedSch,
  occSch,
  socialresSch,
  sportSch,
  catTypeSch,
  EduExamLvl,
  eduExamlvlSch,
} from "../utils/master-interfaces";

interface Master extends Document {
  schoolId: Schema.Types.ObjectId;
  title: Title[];
  session: Session[];
  basicCourse: BasicCourse[];
  course: Course[];
  regFee: RegFee[];
  religion: Religion[];
  casteCategory: CasteCategory[];
  subCaste: SubCaste[];
  country: Country[];
  state: State[];
  district: District[];
  city: City[];
  document: Doc[];
  pageInstruction: PageInstr[];
  board: Board[];
  uploadInstruction: UploadInstr[];
  idProof: IdProof[];
  bloodGroup: Bloodgrp[];
  cultAct: Cult[];
  occupation: Occupation[];
  handicap: HandCapped[];
  sport: Sport[];
  socialReservation: SocialReservation[];
  categoryType: CategoryType[];
  eduExamlvl:EduExamLvl[]
}

const MasterSchema: Schema<Master> = new Schema({
  schoolId: { type: Schema.Types.ObjectId, required: true, ref: "school" },
  title: { type: [TitleSchema], default: [] },
  session: { type: [SessionSchema], default: [] },
  basicCourse: { type: [BasicCourseSchema], default: [] },
  course: { type: [CourseSchema], default: [] },
  regFee: { type: [RegFeeSchema], default: [] },
  religion: { type: [ReligionSchema], default: [] },
  casteCategory: { type: [CasteCategorySchema], default: [] },
  subCaste: { type: [SubCasteSchema], default: [] },
  country: { type: [CountrySchema], default: [] },
  state: { type: [StateSchema], default: [] },
  district: { type: [DistrictSchema], default: [] },
  city: { type: [CitySchema], default: [] },
  document: { type: [DocSchema], default: [] },
  pageInstruction: { type: [PageInstrSchema], default: [] },
  board: { type: [BoardSchema], default: [] },
  uploadInstruction: { type: [UploadInstrSchema], default: [] },
  idProof: { type: [IdProofSchema], default: [] },
  bloodGroup: { type: [bgSch], default: [] },
  cultAct: { type: [cultSch], default: [] },
  occupation: { type: [occSch], default: [] },
  handicap: { type: [handicappedSch], default: [] },
  sport: { type: [sportSch], default: [] },
  socialReservation: { type: [socialresSch], default: [] },
  categoryType: { type: [catTypeSch], default: [] },
  eduExamlvl: { type: [eduExamlvlSch], default: [] },
});

// Create the Master model
const MasterModel = mongoose.model<Master>("master", MasterSchema);

export { Master, MasterModel };
