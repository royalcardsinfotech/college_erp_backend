import mongoose,{Document,Schema} from "mongoose";
import { AppliNoConfig, AppliNoConfigSchema, CourseDocConfig, CourseDocConfigSchema, Dateconfig, DateconfigSchema, FieldConfig, FieldConfigSchema, FieldDocConfig, FieldDocConfigSchema, PageConfig, PageConfigSchema, RegistrationConfig, RegistrationConfigSchema } from "../utils/config-interface";


interface Config extends Document{
    dateConfig:Dateconfig[];
    schoolId:Schema.Types.ObjectId;
    fieldConfig:FieldConfig[];
    regConfig:RegistrationConfig[];
    pageConfig:PageConfig[];
    courseDocConfig:CourseDocConfig[];
    fieldDocConfig:FieldDocConfig[]
    appliNoConfig:AppliNoConfig[]

}


const ConfigSchema: Schema<Config> = new Schema({
    dateConfig:{type:[DateconfigSchema],default:[]},
    schoolId:{type:mongoose.Schema.Types.ObjectId,ref:"school",required:true},
    fieldConfig:{type:[FieldConfigSchema],default:[]},
    regConfig:{type:[RegistrationConfigSchema],default:[]},
    pageConfig:{type:[PageConfigSchema],default:[]},
    courseDocConfig:{type:[CourseDocConfigSchema],default:[]},
    appliNoConfig:{type:[AppliNoConfigSchema],default:[]},
    fieldDocConfig:{
        type:[FieldDocConfigSchema],default:[]
    }
})

const ConfigModel=mongoose.model("config",ConfigSchema)

export {ConfigModel,Config}