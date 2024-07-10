import { NextFunction, Response } from "express";
import { CookieData, CustomRequest } from "../utils/customrequest";
import { decryptData } from "../utils/jwt";
import { secretKey } from "../utils/secretkeys";
import  jwt  from "jsonwebtoken";
import { RoleModel } from "../models/role";

const roleMiddleware =async (req:CustomRequest,res:Response,next:NextFunction)=>{
    const signedToken =req.signedCookies.token;
    if (!signedToken) {
      
      return res.status(401).json();
    }
    
  const token=await decryptData(signedToken)
    try {
      const decoded =  jwt.verify(token, secretKey!) as CookieData ;
        const role=await RoleModel.findById(decoded.roleId)
        if(role?.role_code!="STU" ){
            res.status(401).json("Unauthorized")
        }
      req.data = decoded; 
      next();
    } catch (error) {
      return res.status(401).send('Unauthorized');
    }
}
