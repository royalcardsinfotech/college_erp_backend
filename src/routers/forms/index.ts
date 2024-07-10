
import express from "express"
import { authenticateUser } from "../../middlewares/auth"
import { addFormData, getDataForApplication, uploadFile } from "../../controllers/forms/formSubmission"

const formSubRouter=express.Router()

formSubRouter.post("/uploadfile/:fieldName/:id",authenticateUser(false),uploadFile)
formSubRouter.get("/",authenticateUser(false),getDataForApplication)
formSubRouter.post("/add/:field",authenticateUser(false),addFormData)



export {formSubRouter}