import { Request,Response,NextFunction } from "express";
import { SchoolModel } from "../../models/school";
import { ConfigModel } from "../../models/configuration";
import { createError, createResponse } from "../../utils/response-handler";
import { ErpConfigModel } from "../../models/erpConfig";

export const getSchoolData=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {schoolCode}=req.params
        const school=await SchoolModel.findOne({school_code:schoolCode})
        if(!school){
            res.status(404).json(createError(404, "school", "school with this code not found"));
        }
        const config=await ConfigModel.findOne({schoolId:school?._id})
        res.status(200).json(createResponse("success",{
            school:school,
            appliDates:config?.dateConfig
        }))

    } catch (error) {
        if (typeof error === "string") {
            res.status(500).json(createError(500, "server error", error.toString()));
        } else if (error instanceof Error) {
            res.status(500).json(createError(500, "server error", error.message.toString()));
        }
    }    
}

export const updateSchoolData=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {schoolCode,page,data}=req.body
        
        let school=await ErpConfigModel.findOne()
        if(!school){
            res.status(404).json(createError(404, "school", "school with this code not found"));
        }

        let fields = school!.fields || new Map();

        // Get the existing field array for the specified page or create a new one
        let fieldArray = fields.get(page) || [];
      
        // Add new data to the field array
        for (let index = 0; index < data.length; index++) {
          fieldArray.push(data[index]);
        }
      
        // Set the updated field array back into the fields Map
        fields.set(page, fieldArray);
      
        // Assign the updated fields Map back to the school document
        school!.fields = fields;
      

// Save the school document
await school!.save();
console.log("School saved successfully");
    res.status(200).json(createResponse("success",school))
    } catch (error) {
        console.log(error)
        res.status(500).json(createError(500, "server error", "internal server error"));
    }
}


export const getErpConfig=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const school=await ErpConfigModel.find({})
        
        res.status(200).json(createResponse("success",school[0]))
    } catch (error) {
        console.log(error)
        res.status(500).json(createError(500, "server error", "internal server error"));
    }
}