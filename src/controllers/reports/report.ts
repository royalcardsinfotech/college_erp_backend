
import { Request,Response } from "express";
import { AppliModel } from "../../models/formSubmission";
import { createError, createResponse } from "src/utils/response-handler";


export const getApplicationReport = async (req: Request, res: Response)=> {
    try {
        const {courselvl,basicCourse,course}=req.params
        const {startDate,endDate}=req.query
        const start = new Date(startDate!.toString());
        const end = new Date(endDate!.toString());

        // Validate the date parsing
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json(createError(400,"error", "Invalid date format. Use MM/DD/YYYY."));
        }
        const applications=await AppliModel.find({courselvl,basicCourse,course,subDate:{$gte:start,$lte:end}})
        res.status(200).json(createResponse("success",applications))
    } catch (error) {
        res.status(500).json(createError(500,"error","Something went wrong"));
    }}


    export const getRegisteredReport = async (req: Request, res: Response)=> {
        try {
            
        } catch (error) {
            res.status(500).json(createError(500,"error","Something went wrong"));
        }}


export const getRegistrationSummary = async (req: Request, res: Response)=> {
    try {
        
    } catch (error) {
        res.status(500).json(createError(500,"error","Something went wrong"));
    }
}    

export const getEducationaldetailsReport = async (req: Request, res: Response)=> {
    try
    {
        const {session,basicCourse,course}=req.params
        const {startDate,endDate}=req.query
        const start = new Date(startDate!.toString());
        const end = new Date(endDate!.toString());

        // Validate the date parsing
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json(createError(400,"error", "Invalid date format. Use MM/DD/YYYY."));
        }
        const applications=await AppliModel.find({session,course,subDate:{$gte:start,$lte:end}}).select('education')
        res.status(200).json(createResponse("success",applications))
    } catch (error) {
        res.status(500).json(createError(500,"error","Something went wrong"));
    }



}