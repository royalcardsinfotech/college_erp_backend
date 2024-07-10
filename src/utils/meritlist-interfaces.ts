import mongoose,{Schema,Document} from "mongoose";



export interface MlistQuota extends Document{
    quotaName:String;
    percent?:String;
    quotaType:String;
    serialNo:String;
    active:Boolean
}

export const  mlistquotaSch:Schema<MlistQuota>=new Schema({
    quotaName:{
        type:String,
        required:true
    },
    percent:{
        type:String
    },
    quotaType:{
        type:String,
        required:true
    },
    serialNo:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    },
})

export interface MlistQuotaSeq extends Document{
    general:Number;
    casteCat:Number;
    handicapped:Number;
    social_reservation:Number;
    gender:Number;
    sports:Number;
    jk:Number;
    orphan:Number;

}

export const mlistquotaSeqSch:Schema<MlistQuotaSeq>=new Schema({
    general: {
        type: Number,
        required: true
    },
    casteCat: {
        type: Number,
        required: true
    },
    handicapped: {
        type: Number,
        required: true
    },
    social_reservation: {
        type: Number,
        required: true
    },
    gender: {
        type: Number,
        required: true
    },
    sports: {
        type: Number,
        required: true
    },
    jk: {
        type: Number,
        required: true
    },
    orphan: {
        type: Number,
        required: true
    }
})

export interface CourseQuota extends Document{
    session:String;
    basicCourse:String;
    course:String;
    totalSeat?:Number;
    totalManualSeat?:Number
}

export const courseQuotaSch: Schema<CourseQuota> = new Schema({
    session: {
        type: String,
        required: true
    },
    basicCourse: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    totalSeat: {
        type: Number
    },
    totalManualSeat: {
        type: Number
    }
});

export interface SubQuota extends Document{
    session:String;
    basicCourse:String;
    course:String;
    subQuotaName:String;
    quotaType:String;
    quotaSeat?:String;
    subQuotaType:String
    subQuotaSeat:String
    active:Boolean

}
export const subQuotaSch: Schema<SubQuota> = new Schema({
    session: {
        type: String,
        required: true
    },
    basicCourse: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    subQuotaName: {
        type: String,
        required: true
    },
    quotaType: {
        type: String,
        required: true
    },
    quotaSeat: {
        type: String
    },
    subQuotaType: {
        type: String,
        required: true
    },
    subQuotaSeat: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});