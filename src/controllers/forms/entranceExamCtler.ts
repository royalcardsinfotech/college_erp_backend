import express from "express"
import { NextFunction,Request,Response } from "express";
import { CustomRequest } from "../../utils/customrequest";
import { createError, createResponse } from "../../utils/response-handler";
import { EntaranceConfigModel, EntranceExam } from "../../models/entrance-exam";


export const getFieldDataFromEntranceConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { field, id } = req.params;
    const ent = await EntaranceConfigModel.findOne({schoolId:id});

    if (!ent) {
      return res
        .status(404)
        .json(createError(404, "error", "master not found"));
    }

    const fieldData = ent[field as keyof EntranceExam];

    res.status(200).json(createResponse("field data", fieldData));
  } catch (error) {
    res.status(500).json(createError(500, "error", " internal server error"));
  }
}

export const addToEnCOnfig = async (req: CustomRequest, res: Response) => {
    try {
      const { field, data } = req.body;
      console.log(field + data);
      if (!field || !data) {
        return res
          .status(400)
          .json(createError(400, "error", "Field and data are required"));
      }
      const validFields: (keyof EntranceExam)[] = [
        "candidatureType",
        "schoolId",
        "dteMaster",
        "entranceExam",
        "entranceSubject"
      ];
  
      if (!validFields.includes(field)) {
        return res.status(400).json(createError(400, "error", "invalid field"));
      }
  
      const subject = await EntaranceConfigModel.findById(req.params.id);
  
      if (!subject) {
        return res
          .status(404)
          .json(createError(404, "error", "master not found"));
      }
      let fieldArray = subject[field as keyof EntranceExam] as unknown as any[];
      if (Array.isArray(fieldArray)) {
        
        
          fieldArray.push(data);
        
  
        await subject.save();
        return res.status(200).json(createResponse("added to master",subject ));
      } else {
        return res
          .status(400)
          .json(createError(404, "error", "field is not  array"));
      }
    } catch (error) {
      console.log(error);
  
      return res
        .status(500)
        .json(createError(500, "error", " internal server error"));
    }
  };
  
  export const updateEntConfig = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { field, entconfigId, subId } = req.params;
      const { data } = req.body;
      const validFields: (keyof EntranceExam)[] = [
        "candidatureType",
        "schoolId",
        "dteMaster",
        "entranceExam",
        "entranceSubject"
      ];
      if (!validFields.includes(field as keyof EntranceExam)) {
        return res.status(400).json(createError(400, "error", "invalid field"));
      }
  
      
      const updatedMaster = await EntaranceConfigModel.findOneAndUpdate(
        {
          _id: entconfigId,
          [`${field}._id`]: subId,
        },
        {
          $set: { [`${field}.$`]: data },
        },
        {
          new: true,
        }
      );
  
      res.status(200).json(createResponse("master updated", updatedMaster));
    } catch (error) {
      console.log(error);
  
      res.status(500).json(createError(500, "error", " internal server error"));
    }
  };