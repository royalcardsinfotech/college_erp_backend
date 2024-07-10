import mongoose,{Schema,Document} from "mongoose";

interface Student extends Document{
    
    fatherName?:String;
    fatherOcc?:String
    motherName?:String;
    motherOcc?:String;
    dob?:String;
    parentmail?:String;
    maritalStatus?:String;
    userId:Schema.Types.ObjectId;
    bloodgrp?:String;
    profileUrl:String;
    googleUser:Boolean;
    verified:Boolean;
    aadhar?:String;
    bankName?:String;
    accountNo?:String;
    ifsc?:String;
    category:String;
    parentPhone?:string;
    abcNo:String
    
}

const studentSchema:Schema<Student>=new Schema({
    
    
    maritalStatus:{
        type:String,
        enum:["Unmarried","Married"]
    },
    
    dob:{
        type:String,
        
    },
    
    profileUrl:{
        type:String,
        default:""
    },
    googleUser:{
        type:Boolean,
        default:false
    },
    verified:{
        type:Boolean,
        default:false
    },
    aadhar:{
        type:String,
    },
    parentmail:{
        type:String
    },
    category:{
        type:String,
        enum:["GENERAL",'OBC','EWS','SC','ST']
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
    
    
    
})


const StudentModel=mongoose.model<Student>("student",studentSchema)

export {StudentModel}