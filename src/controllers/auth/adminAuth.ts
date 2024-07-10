import { NextFunction ,Response,Request} from "express"
import { AdminModel } from "../../models/admin"
import { createError, createResponse } from "../../utils/response-handler"
import { decryptData, encryptData, generateEncryptedToken } from "../../utils/jwt"
import { cookieExpiryTime, encryptionKey, environment, ivkey } from "../../utils/secretkeys"
import { CredentialModel } from "../../models/credential"
import { UserModel } from "../../models/user"
import { CustomRequest } from "../../utils/customrequest"
import { MasterModel } from "../../models/master"


// login for admin only
export const adminlogin=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {loginId,password}=req.body
    const cred=await CredentialModel.findOne({email:loginId}) || await CredentialModel.findOne({phone:loginId}) || await CredentialModel.findOne({
      loginId:loginId
    })

    console.log(cred)

    if(!cred){

      // no admin with this loginId
    return  res.status(400).json(createError(400,"login","Login failed. Please check your credentials."))
    }
    if(password){

      if(await decryptData(cred!.password!.toString())!=password){
      return  res.status(400).json(createError(404,"login","Login failed. Please check your credentials."))
      }
    }
    
    // updating lastlogin time
    let user=await UserModel.findById(cred?.userId)
    user!.lastlogin=Date.now()
    await user?.save()

    // getting personal data of admin
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

    
    const etoken=await generateEncryptedToken(personaldata[0].roleData._id,cred!.userId.toString(),cred!._id.toString())
    res.cookie('token',etoken,{httpOnly:environment==="PROD",secure:true,signed:true,maxAge:cookieExpiryTime,sameSite:"none"})
    return  res.status(200).json(createResponse("success",personaldata[0]))
  } catch (error) {
    console.log(error)
  return  res.status(400).json(createError(404,"interna sever error","not found"))
  }
    
}






