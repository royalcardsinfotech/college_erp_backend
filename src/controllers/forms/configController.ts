import { NextFunction, Request, Response } from "express";
import { createError, createResponse } from "../../utils/response-handler";
import { Config, ConfigModel } from "../../models/configuration";
import mongoose from "mongoose";

// adding fields to configuration
export const addToConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { field, data } = req.body;

    if (!field || !data) {
      return res
        .status(400)
        .json(createError(400, "error", "Field and data are required"));
    }

    const validFields: (keyof Config)[] = [
      "courseDocConfig",
      "dateConfig",
      "pageConfig",
      "schoolId",
      "regConfig",
      "fieldConfig",
      "appliNoConfig",
      "fieldDocConfig"
    ];

    if (!validFields.includes(field)) {
      return res.status(400).json(createError(400, "error", "invalid field"));
    }

    const config = await ConfigModel.findById(req.params.id);

    if (!config) {
      return res
        .status(404)
        .json(createError(404, "error", "master not found"));
    }
    let fieldArray = config[field as keyof Config] as unknown as any[];
    if (Array.isArray(fieldArray)) {
      fieldArray.push(data);
      await config.save();
      return res.status(200).json(createResponse("added to master", config));
    } else {
      return res
        .status(400)
        .json(createError(404, "error", "field is not  array"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(createError(500, "error", " internal server error"));
  }
};

export const addFieldsToConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>{
  try {
    const {page,courselvl,course,fields} = req.body;
    let config = await ConfigModel.findById(req.params.id);
    if (!config) {
      return res
        .status(404)
        .json(createError(404, "error", "config not found"));
    }
    let arr;
    if(course!="" && course!=undefined){

       arr=config.fieldConfig.find((item)=>item.page===page && item.courselvl===courselvl && item.course===course)
    }else{
      arr=config.fieldConfig.find((item)=>item.page===page && item.courselvl===courselvl)
    }
    
    if(arr){
      arr.fields=fields;
    }else{
      if(course!="" && course!=undefined){

        config.fieldConfig.push({page,courselvl,course,fields} as any)
      }else{
        config.fieldConfig.push({page,courselvl,fields} as any)
      }
    }
    await config.save();
    return res.status(200).json(createResponse("added to master", config));

  } catch (error) {
    console.log(error);
    res.status(500).json(createError(500, "error", " internal server error"));
  }
}


export const updateConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { field, configId, subId } = req.params;
    const { data } = req.body;
    const validFields: (keyof Config)[] = [
      "courseDocConfig",
      "dateConfig",
      "pageConfig",
      "schoolId",
      "regConfig",
      "fieldConfig",
      "appliNoConfig",
      "fieldDocConfig"
    ];

    if (!validFields.includes(field as keyof Config)) {
      return res.status(400).json(createError(400, "error", "invalid field"));
    }

        const updatedMaster=await ConfigModel.findOneAndUpdate(
            {
                _id: new  mongoose.Types.ObjectId(configId),
                [`${field}._id`]: subId,
              },
              {
                $set: { [`${field}.$`]: data },
              },
              {
                new: true,
              }
    )

    res.status(200).json(createResponse("master updated", updatedMaster));
  } catch (error) {
    res.status(500).json(createError(500, "error", " internal server error"));
  }
};

export const deleteFieldInConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { field, configId, subId } = req.params;

    const validFields: (keyof Config)[] = [
      "courseDocConfig",
      "dateConfig",
      "pageConfig",
      "schoolId",
      "regConfig",
      "fieldConfig",
      "appliNoConfig",
      "fieldDocConfig"
    ];

    if (!validFields.includes(field as keyof Config)) {
      return res.status(400).json(createError(400, "error", "invalid field"));
    }

    const updatedMaster = await ConfigModel.updateOne(
      {
        _id: configId,
      },
      { $pull: { [field]: { _id: subId } } }
    );

    res.status(200).json(createResponse("deleted field", updatedMaster));
  } catch (error) {
    res.status(500).json(createError(500, "error", " internal server error"));
  }
};
