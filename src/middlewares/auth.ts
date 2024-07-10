import { NextFunction ,Request,Response} from "express";
import { encryptionKey, secretKey } from "../utils/secretkeys";
import jwt from 'jsonwebtoken'
import { decryptData } from "../utils/jwt";
import { createError } from "../utils/response-handler";
import { CookieData, CustomRequest } from "../utils/customrequest";
import { RoleModel } from "../models/role";


export const authenticateUser = (admin:boolean)=> {return async(req: CustomRequest, res: Response, next:NextFunction) => {
    const signedToken =req.signedCookies.token
    
    if (!signedToken) {
      
      return res.status(401).json(createError(401,"error","session timeout", ));
    }
    
  const token=await decryptData(signedToken as string)
    try {
      const decoded =  jwt.verify(token, secretKey!) as CookieData ;
      if(admin){
        let role=await RoleModel.findById(decoded.roleId!)
        if(role?.role_code=="STU" ){
          return res.status(401).json(createError(401,"error","Unauhtorised :for admin only", ))
      }
      }
      req.data = decoded; 
      next();
    } catch (error) {
      res.clearCookie("token")
      return res.status(500).json(createError(401,"error","server error" ));
    }}
  };



