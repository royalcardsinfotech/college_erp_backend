import { Request } from "express";

interface CookieData{
    userId:String;
    roleId:String;
    credId:String;
    file?:String;

  }
  
  
  interface CustomRequest extends Request {
    data?:CookieData,
    multerError?:String,
    fieldName?:String
    
  }

  export {CustomRequest,CookieData}