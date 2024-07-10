import mongoose, { Schema, Document, Number } from 'mongoose';

// Title Interface and Schema
export interface Title extends Document {
    name: string;
    active: boolean;
}

export const TitleSchema: Schema<Title> = new Schema({
    name: { type: String, required: true },
    active: { type: Boolean, required: true }
});

// Session Interface and Schema
export interface Session extends Document {
    name: string;
    shortName: string;
    cloudSession: string;
    startDate: String;
    lastDate: String;
    active: boolean;
}

export const SessionSchema: Schema<Session> = new Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    cloudSession: { type: String, required: true },
    startDate: { type: String, required: true },
    lastDate: { type: String, required: true },
    active: { type: Boolean, required: true }
});

// BasicCourse Interface and Schema
export interface BasicCourse extends Document {
    courselvl: string;
    name: string;
    active: boolean;
}

export const BasicCourseSchema: Schema<BasicCourse> = new Schema({
    courselvl: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, required: true }
});

// Course Interface and Schema
export interface Course extends Document {
    basicCourse: string;
    name: string;
    course_code: string;
    max_intake: number;
    active: boolean;
}

export const CourseSchema: Schema<Course> = new Schema({
    basicCourse: { type: String, required: true },
    name: { type: String, required: true },
    course_code: { type: String, required: true },
    max_intake: { type: Number, required: true },
    active: { type: Boolean, required: true }
});

// RegFee Interface and Schema
export interface RegFee extends Document {
    basicCourse: string;
    course: string;
    caste: string;
    amount: number;
    active: boolean;
}

export const RegFeeSchema: Schema<RegFee> = new Schema({
    basicCourse: { type: String, required: true },
    course: { type: String, required: true },
    caste: { type: String, required: true },
    amount: { type: Number, required: true },
    active: { type: Boolean, required: true }
});

// Religion Interface and Schema
export interface Religion extends Document {
    name: string;
    minority: boolean;
    active: boolean;
}

export const ReligionSchema: Schema<Religion> = new Schema({
    name: { type: String, required: true },
    minority: { type: Boolean, required: true },
    active: { type: Boolean, required: true }
});

// CasteCategory Interface and Schema
export interface CasteCategory extends Document {
    name: String;
    reservation_percent: String;
    gender: string;
    active: boolean;
    reserved: boolean;
    firstApplyFee: boolean;
    general:Boolean
}

export const CasteCategorySchema: Schema<CasteCategory> = new Schema({
    name: { type: String, required: true },
    reservation_percent: { type: String, required: true },
    gender: { type: String, required: true },
    active: { type: Boolean, required: true },
    reserved: { type: Boolean, required: true },
    general:{type: Boolean, required: true },
    firstApplyFee: { type: Boolean, required: true }
});

// SubCaste Interface and Schema
export interface SubCaste extends Document {
    category: string;
    name: string;
    active: boolean;
}

export const SubCasteSchema: Schema<SubCaste> = new Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, required: true }
});

// Country Interface and Schema
export interface Country extends Document {
    name: string;
    active: boolean;
}

export const CountrySchema: Schema<Country> = new Schema({
    name: { type: String, required: true },
    active: { type: Boolean, required: true }
});

// State Interface and Schema
export interface State extends Document {
    country: string;
    name: string;
    active: boolean;
}

export const StateSchema: Schema<State> = new Schema({
    country: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, required: true }
});

// District Interface and Schema
export interface District extends Document {
    country: string;
    state: string;
    name: string;
    active: boolean;
}

export const DistrictSchema: Schema<District> = new Schema({
    country: { type: String, required: true },
    state: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, required: true }
});

// City Interface and Schema
export interface City extends Document {
    country: string;
    state: string;
    district: string;
    name: string;
    active: boolean;
}

export const CitySchema: Schema<City> = new Schema({
    country: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, required: true }
});

// Doc Interface and Schema
export interface Doc extends Document {
    name: string;
    mandatory: boolean;
    undertaking: boolean;
    active: boolean;
}

export const DocSchema: Schema<Doc> = new Schema({
    name: { type: String, required: true },
    mandatory: { type: Boolean, required: true },
    undertaking: { type: Boolean, required: true },
    active: { type: Boolean, required: true }
});

// UploadInstr Interface and Schema
export interface UploadInstr extends Document {
    uploadedProspectus: Boolean;
    file: String;
    courselvl?:String;
}

export const UploadInstrSchema: Schema<UploadInstr> = new Schema({
    uploadedProspectus: { type: Boolean, required: true },
    file: { type: String, required: true },
    courselvl:{type:String}
});

// PageInstr Interface and Schema
export interface PageInstr extends Document {
    page: string;
    instruction: string;
    courselvl:String;
    course:String[]
}

export const PageInstrSchema: Schema<PageInstr> = new Schema({
    page: { type: String, required: true },
    instruction: { type: String, required: true},
    course:{
        type:[String],
        default:[]
    },
    courselvl:{
        type: String, required: true
    }
});

// Board Interface and Schema
export interface Board extends Document {
    courselvl: string;
    name: string;
    active:Boolean
}

export const BoardSchema: Schema<Board> = new Schema({
    courselvl: { type: String, required: true },
    name: { type: String, required: true },
    active:{type:Boolean,required:true}
});

// IdProof Interface and Schema
export interface IdProof extends Document {
    name: string;
    active: boolean;
}

export const IdProofSchema: Schema<IdProof> = new Schema({
    name: { type: String, required: true },
    active: { type: Boolean, required: true }
});


export interface HandCapped extends Document{
    shortName:String;
    description:String;
    percent?:String;
    active:Boolean
}

export const handicappedSch:Schema<HandCapped>=new Schema({
    shortName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    percent:String,
    active:{
        type:Boolean,
        required:true
    }
})
export interface Bloodgrp extends Document{
    name:String;
    active:Boolean
}
export const bgSch:Schema<Bloodgrp>=new Schema({
    name:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    }
    
})

export interface Occupation extends Document{
    name:String;
    active:Boolean
}
export const occSch:Schema<Occupation>=new Schema({
    name:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    }
})
export interface Sport extends Document{
    name:String;
    active:Boolean
}
export const sportSch:Schema<Sport> =new Schema({
    name:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,required:true
    }
        
})
export interface Cult extends Document{
    name:String;
    active:Boolean
}
export const cultSch:Schema<Cult> =new Schema({
    name:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,required:true
    }
        
})

export interface SocialReservation extends  Document{
    name:String;
    active:Boolean  
}  
export const socialresSch:Schema<SocialReservation>=new Schema({ 
    name:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    }
})

export interface CategoryType extends Document{
    courselvl:String;
    name:String;
    meritOrder?:String
    minority:Boolean
    open:Boolean
    active:Boolean
}
export const catTypeSch:Schema<CategoryType>=new Schema({
    courselvl:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    meritOrder:{
        type:String,
    
    },
    minority:{
        type:String,
        required:true
    },
    open:{
        type:String,
        required:true
    },
    active:{
        type:String,
        required:true
    },
})

export interface EduExamLvl extends Document{
    name:String;
    courselvl:String;
    compulsory:Boolean;
    active:Boolean
}
export const eduExamlvlSch:Schema<EduExamLvl>=new Schema({
    name:{
        type:String,
        required:true
    },
    courselvl:{
        type:String,
        required:true
    },
    compulsory:{
        type:Boolean,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    }
})