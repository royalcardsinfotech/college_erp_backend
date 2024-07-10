import { Request,Response,NextFunction } from "express";
import { createError, createResponse } from "../../utils/response-handler";
import { AppliModel } from "src/models/formSubmission";

export const unlockStudent =async (req:Request,res:Response)=>{
    try {
        const {appliNo}=req.params
        let application=await AppliModel.findOne({
            appliNo:appliNo
        })
        if(!application){
            return res.status(404).json(createError(404,"error","no student found"))
        }

        application.locked=false;

        await application.save()

        res.status(200).json(createResponse("success",application))

    } catch (error) {
        res.status(500).json(createError(500,"error"," internal server error"))
    }
}
export const confirmAppli =async (req:Request,res:Response)=>{
    try {
        const {appliNo}=req.params
        let application=await AppliModel.findOne({
            appliNo:appliNo
        })
        if(!application){
            return res.status(404).json(createError(404,"error","no student found"))
        }

        application.confirmed=true;

        await application.save()

        res.status(200).json(createResponse("success",application))

    } catch (error) {
        res.status(500).json(createError(500,"error"," internal server error"))
    }
}

export const sendAppliDocs =async (req:Request,res:Response)=>{
    try {
        const {appliNo}=req.params
        let application=await AppliModel.findOne({
            appliNo:appliNo
        })
        if(!application){
            return res.status(404).json(createError(404,"error","no student found"))
        }
        const d=application.uploads
        res.status(200).json(createResponse("success",d))
    } catch (error) {
        res.status(500).json(createError(500,"error"," internal server error"))
    }
}

export const getAppliByNo=async(req:Request,res:Response)=>{
    try {
        const {appliNo}=req.params
        let application=await AppliModel.findOne({
            appliNo:appliNo
        })
        if(!application){
            return res.status(404).json(createError(404,"error","no student found"))
        }
        return res.status(200).json(createResponse("success",application))
    } catch (error) {
        res.status(500).json(createError(500,"error"," internal server error"))
    }
}

export const updateAppli =async (req:Request,res:Response)=>{
    try {
        const {appliNo}=req.params
        const {data}=req.body
        if (!appliNo || !data) {
            return res.status(400).json({ message: 'Application number and data are required.' });
        }
        let application=await AppliModel.findOneAndUpdate(
        {
            appliNo:appliNo
        },{
            $set:data
        },{
            new:true
        }
    )
        
    res.status(200).json(createResponse("success",application))


        
    } catch (error) {
        res.status(500).json(createError(500,"error"," internal server error"))
    }
}

