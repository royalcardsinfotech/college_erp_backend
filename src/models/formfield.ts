import mongoose,{Schema,Document} from "mongoose";

interface FormField extends Document{
    fieldname:String;
    fieldtype:String;
    options?:String[];
    fieldDataType:String

    
}

const formfieldSchema: Schema<FormField>=new Schema({
    fieldname:{
        type:String,
        required:true
    },
    fieldtype:{
        type:String,
        enum:["PERSONAL","ACADEMIC","Address","Bank DETAILS"]
    },
    options:[String],
    fieldDataType:{
        type:String,
        enum:["String","Int","Date","Boolean","Pdf","Image","Select",""]
    }
})
const FormFieldModel = mongoose.model<FormField>('c', formfieldSchema);

export { FormFieldModel };