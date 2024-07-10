import express from "express"
import { getSchoolData, updateSchoolData } from "../../controllers/data"
import { addSchool } from "../../controllers/admin/adminAction"

const schoolRouter=express.Router()


schoolRouter.get("/:schoolCode",getSchoolData)
schoolRouter.post("/create",addSchool)
schoolRouter.post("/update",updateSchoolData)
export {schoolRouter}