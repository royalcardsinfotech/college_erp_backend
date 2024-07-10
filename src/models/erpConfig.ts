import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";


export interface Field extends Document{
    mandatory:Boolean;
    name:String;
    fieldName:String;
  }
  const fieldSchema:Schema<Field>=new Schema({ 
    mandatory:Boolean,
    name:String,
    fieldName:String
  })

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

interface ErpConfig extends Document{
    menu:Map<string,String[]>,
    fields:Map<String,Field[]>;
    formPages:FormPages[];
}

const erpConfigSchema:Schema<ErpConfig>=new Schema({
    menu:{
        type:Map,
        of:[String],
        default:{}
    },
    fields:{
        type:Map,
        of:[fieldSchema],
        default:{}
    },
    formPages:{
        type:[formPagesSchema],
        default:[]
    }
})

const ErpConfigModel=mongoose.model<ErpConfig>("erpConfig",erpConfigSchema)
export {ErpConfigModel,ErpConfig}