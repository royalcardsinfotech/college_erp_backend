import { NextFunction, Response } from "express";
import { CookieData, CustomRequest } from "../utils/customrequest";
import { decryptData } from "../utils/jwt";
import { authguardpass, secretKey } from "../utils/secretkeys";
import  jwt  from "jsonwebtoken";
import { RoleModel } from "../models/role";
import { createError } from "../utils/response-handler";

export const AuthGuard =async (req:CustomRequest,res:Response,next:NextFunction)=>{
  
    const authpass =req.headers.authguardpass;
    if (authpass==null) {
      
      return res.status(401).json(createError(401,"error","authguard missing"));
    }
    
  
  if(authpass!=authguardpass){
    return res.status(401).json(createError(401,"error","incorrect pass"));
  }
  next()
    
}
