import { NextFunction,Request,Response } from "express";
import { AdminModel } from "../../models/admin";
import { createError, createResponse } from "../../utils/response-handler";
import { CredentialModel } from "../../models/credential";
import { RoleModel } from "../../models/role";
import { UserModel } from "../../models/user";
import { encryptData } from "../../utils/jwt";
import { encryptionKey, ivkey } from "../../utils/secretkeys";
import { SchoolModel } from "../../models/school";
import { MasterModel } from "../../models/master";
import { ConfigModel } from "../../models/configuration";
import { QExamModel } from "../../models/qualifying-exam";
import { SubModel } from "../../models/subject";
import { EntaranceConfigModel } from "../../models/entrance-exam";
import { AppliModel } from "../../models/formSubmission";
import mongoose from "mongoose";

// for adding new admin of a particular school by SuperAdmin only
export const addAdmin=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email,password,schoolId,name,phone,loginId}=req.body
        const ad=await CredentialModel.findOne({email:email}) || await CredentialModel.findOne({phone:phone}) || await CredentialModel.findOne({
            loginId:loginId
        })
        if(ad){
            return res.status(400).json(createError(400,"admin","Please use another email address or phone"))
        }
        
        
        let newUser=new UserModel({
            schoolId:schoolId,
            name:name,

        })
        await newUser.save()

        const encPass= encryptData(password,encryptionKey!,ivkey!) // encrypting password before saving to database

        let newCred=new CredentialModel({
            userId:newUser._id,
            email:email,
            password:encPass,
            phone:phone,
            loginId:loginId
        })


        await newCred.save()
        
        let admin=new AdminModel({
            userId:newUser._id,
            schoolId:schoolId
        })

        await admin.save()

        return res.status(200).json(createResponse("success",{...newUser._doc,role:{},roleData:admin,credentials:newCred}))

    } catch (error) {
        console.log(error)
        return res.status(500).json(createError(500,"error","internal server error"))
    }

}

// for deleting admin by superadmin

export const deleteAdmin=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const {id,userId,roleId}=req.params
        await AdminModel.findByIdAndDelete(id)
        await RoleModel.findByIdAndDelete(roleId)
        await UserModel.findByIdAndDelete(userId)
        await CredentialModel.findOneAndDelete({userId:userId})
        res.status(200).json(createResponse("success",{}))
        
    } catch (error) {
        res.status(500).json(createError(500,"error","internal server error"))
    }
}

export const updatePass=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {password}=req.body
        const cred=await CredentialModel.findOne({userId:req.params.userId})
        const epass=encryptData(password,encryptionKey!,ivkey!)
        cred!.password=epass
        await cred?.save()
        res.status(200).json(createResponse("success",cred))
    } catch (error) {
        res.status(500).json(createError(500,"error","internal server error"))
    }
}


// for adding new school by SuperAdmin only
export const addSchool=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {sch_code,name}=req.body
        const school=await SchoolModel.findOne({school_code:sch_code})
        if(school){
            res.status(400).json(createError(400,"error","Please use another school code."))
        }

        
        let sch=new SchoolModel({
            school_code:sch_code,
            name:name
        })

        await sch.save()
        // initiliazing all the models for the school 
        let master=new MasterModel({
            schoolId:sch._id
        })
        
        let config=new ConfigModel({
            schoolId:sch._id
        })
        let qexam=new QExamModel({
            schoolId:sch._id
        })

        let appli=new AppliModel({
            schoolId:sch._id
        })

        let sub=new SubModel({
            schoolId:sch._id
        })

        let ent=new EntaranceConfigModel({
            schoolId:sch._id
        })
        
        await Promise.all([
            master.save(),
            config.save(),
            qexam.save(),
            appli.save(),
            sub.save(),
            ent.save()
        ])
        

        return res.status(200).json(createResponse("added school",sch))
    } catch (error) {
        return res.status(500).json(createError(500,"error","internal server error"))
    }
}


// for adding new configuration if left by chance or if new configuration has been added for eexisting school by SuperAdmin only
export const addNewConfig=async (req:Request,res:Response)=>{
    try {
        const {sch_code}=req.body
        const school=await SchoolModel.findOne({school_code:sch_code})
        if(!school){
            return res.status(400).json(createError(400,"error","school with this school code already exits"))
        }

        
        
        
        let qexam=new EntaranceConfigModel({
            schoolId:school!._id
        })
        await qexam.save()
    

        res.status(200).json(createResponse("added school",qexam))
    } catch (error) {
        res.status(500).json(createError(500,"error","internal server error"))
    }
}


export const addNewRole=async (req:Request,res:Response)=>{
    try {
        const {description,role_code,schoolId}=req.body
        const role=await RoleModel.findOne
        ({
            role_code:role_code,
        })
        if(role){
            return res.status(400).json(createError(400,"error","role with this role code already exits"))
        }
        let nr=new RoleModel(
            {
                description:description,

            role_code:role_code,
            schoolId:schoolId
        }
        )

        await nr.save()
        const roles=await RoleModel.find({schoolId:schoolId})
        res.status(200).json(createResponse("success",roles))
    }
    catch (error) {
            res.status(500).json(createError(500,"error","internal server error"))
    }
}

export const allocateRoleMenu=async (req:Request,res:Response)=>{
    try {
        const {menu,sections,roleId}=req.body
        let roleAdmin=await RoleModel.findById(roleId)
        const allocatedRoleMenu = roleAdmin!.allocatedRoles || {};

  // Get the existing role map or create a new one
  let roleMap = allocatedRoleMenu.get(menu) || [];

  // Add or update the menu sections
  roleMap=sections

  // Update the allocatedRoleMenu with the new roleMap
  allocatedRoleMenu.set(menu,roleMap)

  // Assign the updated allocatedRoleMenu back to the school document
  roleAdmin!.allocatedRoles = allocatedRoleMenu;

  // Save the updated school document
  await roleAdmin!.save();
  
        res.status(200).json(createResponse("success", roleAdmin));
    } catch (error) {
        res.status(500).json(createError(500,"error","internal server error"))
    }
}


export const allocateRoleToAdmin=async (req:Request,res:Response)=>{
    try {
        const {userId}=req.params
        const {roleIds}=req.body
        let admin=await AdminModel.findOne({userId:userId})
        admin!.roleId=roleIds
        await admin!.save()
        res.status(200).json(createResponse("success",admin))
    } catch (error) {
        console.log(error)
        res.status(500).json(createError(500,"error","internal server error"))
    }
}