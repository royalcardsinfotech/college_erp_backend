import { NextFunction, Request, Response } from "express";
import { FormFieldModel } from "../../models/formfield";
import { createError, createResponse } from "../../utils/response-handler";

export const addfield = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fieldname, fieldtype, fieldDataType, options } = req.body;
        const field = await FormFieldModel.findOne({ fieldname: fieldname });

        if (field) {
            res.status(400).json(createError(400, "field addition", "this field already exists"));
        }
        let newField = new FormFieldModel({
            fieldname,
            fieldtype,
            fieldDataType,
            options
        });

        await newField.save();

        res.status(200).json(createResponse("field created",newField));
    } catch (error: unknown) {
        if (typeof error === "string") {

            res.status(500).json(createError(500, "server error", error.toString()));
        } else if (error instanceof Error) {
            res.status(500).json(createError(500, "server error", error.message.toString()));
        }
    }

};

export const updatefield = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id,fieldname, fieldtype, 
            fieldDataType, options } = req.body;
        let field = await FormFieldModel.findById(id);

        if (!field) {
            res.status(400).json(createError(400, "field updation", "this field doesn't exist"));
        }
        field!.fieldname=fieldname
        field!.fieldDataType=fieldDataType
        field!.fieldtype=fieldtype
        field!.options=options



        await field!.save();

        res.status(200).json(createResponse("field updated",field));
    } catch (error: unknown) {
        if (typeof error === "string") {

            res.status(500).json(createError(500, "server error", error.toString()));
        } else if (error instanceof Error) {
            res.status(500).json(createError(500, "server error", error.message.toString()));
        }
    }

};

export const deleteField=async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {id}=req.params
        const field=await FormFieldModel.findById(id)
        if(!field){
            res.status(400).json(createError(400, "field deletion", "no field found"));
        }

        await FormFieldModel.findByIdAndDelete(id)
        res.status(200).send(createResponse("field deleted",{}))
    } catch (error) {
        if (typeof error === "string") {

            res.status(500).json(createError(500, "server error", error.toString()));
        } else if (error instanceof Error) {
            res.status(500).json(createError(500, "server error", error.message.toString()));
        }
    }
}


