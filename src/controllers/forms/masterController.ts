import { NextFunction, Request, Response } from "express";
import { createError, createResponse } from "../../utils/response-handler";
import { Master, MasterModel } from "../../models/master";
import { CustomRequest } from "../../utils/customrequest";
import multer from "multer";
import { AppliModel } from "../../models/formSubmission";
import { upload } from "../../utils/fileUploader";
import { environment, apiUrl } from "../../utils/secretkeys";

export const addToMaster = async (req: CustomRequest, res: Response) => {
  try {
    const { field, data } = req.body;
    console.log(field + data);
    if (!field || !data) {
      return res
        .status(400)
        .json(createError(400, "error", "Field and data are required"));
    }
    const validFields: (keyof Master)[] = [
      "title",
      "categoryType",
      "session",
      "basicCourse",
      "sport",
      "cultAct",
      "course",
      "regFee",
      "occupation",
      "religion",
      "casteCategory",
      "subCaste",
      "country",
      "state",
      "district",
      "city",
      "document",
      "pageInstruction",
      "board",
      "uploadInstruction",
      "idProof",
      "socialReservation",
      "handicap",
      "bloodGroup",
      "eduExamlvl",
    ];

    if (!validFields.includes(field)) {
      return res.status(400).json(createError(400, "error", "invalid field"));
    }

    const master = await MasterModel.findById(req.params.id);

    if (!master) {
      return res
        .status(404)
        .json(createError(404, "error", "master not found"));
    }
    let fieldArray = master[field as keyof Master] as unknown as any[];
    if (Array.isArray(fieldArray)) {
      if (field === "uploadInstruction") {
        let modifiedData = JSON.parse(data);
        if (req.data?.file) {
          modifiedData["file"] = req.data.file;
          fieldArray.push(modifiedData);
        } else {
          return res
            .status(500)
            .json(createError(500, "error", "file not uploaded"));
        }
      } else {
        fieldArray.push(data);
      }

      await master.save();
      return res.status(200).json(createResponse("added to master", master));
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

export const updateMaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { field, masterId, subId } = req.params;
    const { data } = req.body;
    const validFields: (keyof Master)[] = [
      "title",
      "session",
      "categoryType",
      "eduExamlvl",
      "basicCourse",
      "sport",
      "cultAct",
      "course",
      "occupation",
      "regFee",
      "religion",
      "casteCategory",
      "bloodGroup",
      "subCaste",
      "country",
      "state",
      "district",
      "city",
      "document",
      "pageInstruction",
      "board",
      "uploadInstruction",
      "idProof",
      "socialReservation",
      "handicap",
    ];

    if (!validFields.includes(field as keyof Master)) {
      return res.status(400).json(createError(400, "error", "invalid field"));
    }
    const updatedMaster = await MasterModel.findOneAndUpdate(
      {
        _id: masterId,
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
export const deleteFieldInMaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { field, masterId, subId } = req.params;

    const validFields: (keyof Master)[] = [
      "title",
      "session",
      "categoryType",
      "basicCourse",
      "course",
      "occupation",
      "regFee",
      "religion",
      "bloodGroup",
      "casteCategory",
      "subCaste",
      "country",
      "state",
      "district",
      "city",
      "document",
      "pageInstruction",
      "board",
      "uploadInstruction",
      "idProof",
      "socialReservation",
      "handicap",
    ];

    if (!validFields.includes(field as keyof Master)) {
      return res.status(400).json(createError(400, "error", "invalid field"));
    }

    const updatedMaster = await MasterModel.updateOne(
      {
        _id: masterId,
      },
      { $pull: { [field]: { _id: subId } } }
    );

    res.status(200).json(createResponse("deleted field", updatedMaster));
  } catch (error) {
    res.status(500).json(createError(500, "error", " internal server error"));
  }
};

export const uploadInstrt = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    req.fieldName = "prospectus";

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json(createError(400, "error", "file should be less than 1 mb"));
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res
            .status(400)
            .json(createError(400, "error", "unexpected file found"));
        }

        return res.status(400).json({ error: err.message.toString() });
      } else if (err) {
        return res.status(500).json({ error: err.message.toString() });
      }

      next();
    });
  } catch (error) {
    if (typeof error === "string") {
      res.status(500).json(createError(500, "server error", error.toString()));
    } else if (error instanceof Error) {
      res
        .status(500)
        .json(createError(500, "server error", error.message.toString()));
    }
  }
};
