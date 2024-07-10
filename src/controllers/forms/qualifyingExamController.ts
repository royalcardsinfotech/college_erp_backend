import { NextFunction, Request,Response } from "express";
import { createError, createResponse } from "../../utils/response-handler";
import { QExamModel, QualifyingExamConfig } from "../../models/qualifying-exam";



export const addToQExamConfig=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const { field, data } = req.body;

        if (!field || !data) {
            return res.status(400).json(createError(400,"error",'Field and data are required'));
        }

        const validFields: (keyof QualifyingExamConfig)[] = [
            "exam","stream","semester","subject","mapping","schoolId"
        ];

        if (!validFields.includes(field)) {
            return res.status(400).json(createError(400,"error",'invalid field'));
        }

        const qem = await QExamModel.findById(req.params.id);

        if (!qem) {
            return res.status(404).json(createError(404,"error",'master not found'));
        }
        let fieldArray = qem[field as keyof QualifyingExamConfig] as unknown as any[];
        if (Array.isArray(fieldArray)) {
            fieldArray.push(data);
            await qem.save();
            return res.status(200).json(createResponse("added to master",qem));
        } else {
            return res.status(400).json(createError(404,"error",'field is not  array'));
        }
    } catch (error) {
        res.status(500).json(createError(500,"error"," internal server error"))
    }
}


export const updateQExamConfig=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {field,qexamId,subId}=req.params
        const {data}=req.body
        const validFields: (keyof QualifyingExamConfig)[] = [
            "exam","stream","semester","subject","mapping","schoolId"
        ];

        if (!validFields.includes(field as keyof QualifyingExamConfig)) {
            return res.status(400).json(createError(400,"error",'invalid field'));
        }

        const updatedMaster=await QExamModel.findOneAndUpdate(  {
            _id: qexamId,
            [`${field}._id`]: subId,
          },
          {
            $set: { [`${field}.$`]: data },
          },
          {
            new: true,
          }
    )

        res.status(200).json(createResponse("master updated",updatedMaster))
    } catch (error) {
        res.status(500).json(createError(500,"error"," internal server error"))
    }
}   
export const deleteQExamConfig=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {field,qexamId,subId}=req.params
        
        const validFields: (keyof QualifyingExamConfig)[] = [
            "exam","stream","semester","subject","mapping","schoolId"
        ];

        if (!validFields.includes(field as keyof QualifyingExamConfig)) {
            return res.status(400).json(createError(400,"error",'invalid field'));
        }

        const updatedMaster=await QExamModel.updateOne({
            _id:qexamId
        },{$pull:{[field]:{_id:subId}}}
        
    )

        res.status(200).json(createResponse("deleted field",updatedMaster))
    } catch (error) {
        res.status(500).json(createError(500,"error"," internal server error"))
    }
}   

export const copyExamConfig =async (req:Request,res:Response)=>{
    try {
        
    } catch (error) {
        res.status(500).json(createError(500,"error"," internal server error"))
    }
}