import { NextFunction, Request, Response } from "express";
import { FormFieldModel } from "../../models/formfield";
import { createError, createResponse } from "../../utils/response-handler";
import { FormModel } from "../../models/form";
import mongoose, { ObjectId, Schema } from "mongoose";


export const createForm=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        
        let form =await FormModel.find({name:req.body.name})
        if(form){
            res.status(400).json(createError(400,"error","already exists"))
        }
        let newForm=new FormModel(req.body)
        await newForm.save()
        res.status(200).json(createResponse("success",newForm))

    } catch (error) {
        res.status(500).json(createError(500,"error"," internal server error"))
    }
}

export const addFields=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let form=await FormModel.findById(req.params.id)
        if(form){

            form.field=req.body.opts
            await form.save()
            res.status(200).json(createResponse("success",form))
        }else{
            res.status(400).json(createError(404,"error","not found"))
        }
    } catch (error) {
        res.status(500).json(createError(500,"error"," internal server error"))
    }
}

export const deleteField=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let form=await FormModel.findById(req.params.id)
        if(form){

            var fields= form.field

            let i=fields.indexOf(form._id)
            fields.splice(i,1)
            await form.save()
            res.status(200).json(createResponse("success",form))
        }
        res.status(400).json(createError(404,"error","not found"))
    } catch (error) {
        res.status(500).json(createError(500,"error"," internal server error"))
    }
}



