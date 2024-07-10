import { NextFunction, Request,Response } from "express";
import { CustomRequest } from "../../utils/customrequest";
import { createError, createResponse } from "../../utils/response-handler";
import { UserModel } from "../../models/user";
import { MasterModel } from "../../models/master";
import { CredentialModel } from "../../models/credential";


export const updateCred=async (req:CustomRequest,res:Response,next:NextFunction)=>{
    try {
        let cred=await CredentialModel.findById(req.data?.credId)
        cred!.email=req.body.email,
        cred!.phone=req.body.phone
        
        await cred?.save()
        let user=await UserModel.findById(req.data?.userId)
        user!.address=req.body.address
        user!.name=req.body.name
        await user?.save()
        res.status(200).json(createResponse("data",{}))
    } catch (error:unknown) {
        if (typeof error === "string") {

            res.status(500).json(createError(500, "server error", error.toString()));
        } else if (error instanceof Error) {
            res.status(500).json(createError(500, "server error", error.message.toString()));
        }
    }
}

export const getUserData=(name:string)=>{return async (req:CustomRequest,res:Response,next:NextFunction)=>{
    try {
      let cred=await CredentialModel.findById(req.data!.credId) 
      if(!cred){
        return  res.status(404).json(createError(404,"data fetch","not found"))
      }
      const personaldata =await UserModel.aggregate([
        {
          $match:{_id:cred?.userId}
        },
        {
          
          $lookup:{
            from:'admins',
            localField:'_id',
            foreignField:"userId",
            as:"roleData"
          }
        },{
          $unwind:"$roleData"
        },
        {
          $set: {
            roleId: '$roleData.roleId'
          }
        },
          {
            $lookup: {
              from: "roles",
              let: { roleIds: "$roleId" },  // Use the `let` option to define variables to be used in the pipeline
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$roleIds"]  // Use the $in operator to match documents whose _id is in roleIds array
                    }
                  }
                }
              ], as: "roles"}
        },
      ])
       
      personaldata[0]["email"]=cred?.email
      personaldata[0]["phone"]=cred?.phone
      
        return res.status(200).json(createResponse("personal data",personaldata[0]))
    } catch (error:unknown) {
      console.log(error)
        if (typeof error === "string") {

            res.status(500).json(createError(500, "server error", error.toString()));
        } else if (error instanceof Error) {
            res.status(500).json(createError(500, "server error", error.message.toString()));
        }
    }
}}

