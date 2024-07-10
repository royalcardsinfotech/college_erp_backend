import { NextFunction, Request, Response, response } from "express";
import { CustomRequest } from "../../utils/customrequest";
import { createError, createResponse } from "../../utils/response-handler";
import { upload } from "../../utils/fileUploader";
import multer from "multer";

import { CredentialModel } from "../../models/credential";
import { UserModel } from "../../models/user";
import { MasterModel } from "../../models/master";
import { ConfigModel } from "../../models/configuration";
import { apiUrl, environment } from "../../utils/secretkeys";
import { AppliModel, Application } from "../../models/formSubmission";
import { QExamModel } from "../../models/qualifying-exam";
import { SubModel } from "../../models/subject";
import { EntaranceConfigModel } from "../../models/entrance-exam";
import { RoleModel } from "../../models/role";
import { AdminModel } from "../../models/admin";


export const uploadFile = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { fieldName, id } = req.params
    req.fieldName = fieldName
    console.log(fieldName)
    upload(req, res, async function (err) {

      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json(createError(400, "error", "file should be less than 1 mb"));
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json(createError(400, "error", "unexpected file found"));
        }

        return res.status(400).json({ error: err.message.toString() });
      } else if (err) {
        return res.status(500).json({ error: err.message.toString() });
        
      }

      if (!req.file) {
        console.log("No files were uploaded.")
        return res.status(400).json(createError(404, "error", "something went wrong"));
      }
  try {

        if (environment === "TEST") {
          let form = await AppliModel.findById(id)
          if(!form){
            return res.status(404).json(createError(404,"error","something went wrong"))
          }
          let uploadArray = form?.uploads!

          for (let index = 0; index < uploadArray.length; index++) {
            if (uploadArray[index].name === fieldName) {
              uploadArray[index].url != req.data?.file
              await form?.save()
              return res.status(200).json(createResponse("file changed", form))

            }

          }

          const data = {
            name: fieldName,
            url: req.data?.file,
          }
          uploadArray?.push(data as any)
          await form?.save()
          return res.status(200).json(createResponse("file changed", form))

        }

        res.status(200).json(createResponse("success", {
          fileUrl: apiUrl! + "/uploads/" + req.data?.file,
        }))
      }
      catch (e) {
        console.log(e)
        res.status(500).send(e);
      }

    });

  } catch (error) {
    if (typeof error === "string") {

      res.status(500).json(createError(500, "server error", error.toString()));
    } else if (error instanceof Error) {
      res.status(500).json(createError(500, "server error", error.message.toString()));
    }
  }
}

export const getDataForApplication = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const cred = await CredentialModel.findById(req.data!.credId)
    if (!cred) {
      return res.status(404).json(createError(404, "error", "not found"))
    }
    const user = await UserModel.findById(cred.userId)
     
    const [master, config, appli, qdata, subconfig, entconfig,roles] = await Promise.all([
      MasterModel.findOne({ schoolId: user!.schoolId }),
      ConfigModel.findOne({ schoolId: user!.schoolId }),
      AppliModel.find({ userId: req.data!.userId }) || [],
      QExamModel.findOne({ schoolId: user!.schoolId }),
      SubModel.findOne({ schoolId: user!.schoolId }),
      EntaranceConfigModel.findOne({ schoolId: user!.schoolId }),
      RoleModel.find({schoolId:user!.schoolId}),
      
    ]);
    
    
    
    res.status(200).json(createResponse("success", { master, config, application: appli ,qexam:qdata,subconfig,entconfig,roles}))
  } catch (error) {
    console.log(error)
    res.status(500).json(createError(500, "error", "internal server error"))
  }
}

export const addFormData = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const {courselvl, data, schoolId } = req.body
    const { field } = req.params
    console.log(data)
    if (!field || data==null) {
      return res.status(400).json(createError(400, "error", 'Field and data are required'));
    }

    const validFields: (keyof Application)[] = [
      'course', "userId", "courselvl", "confirmed", "paymentStatus", "schoolId", "personal", "uploads","address","subDate"]
    if (!validFields.includes(field as any)) {
      return res.status(400).json(createError(400, "error", 'invalid field'));
    }

    let form = await AppliModel.findOne({ userId: req.data!.userId, courselvl: courselvl })
    if (!form) {
      let newAppli = new AppliModel({
        userId: req.data!.userId,
        schoolId,
        courselvl
      })
      newAppli[field as keyof Application] = data
      await newAppli.save()

      return res.json(createResponse("form saved successfully", newAppli))
    }
    form[field as keyof Application] = data
    await form.save()
    return res.json(createResponse("form saved successfully", form))

  } catch (error) {
    res.status(500).json(createError(500, "error", "internal server error"))
  }
}