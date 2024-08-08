import express from "express";
import { addAdmin, addNewConfig, addNewRole, allocateRoleMenu, allocateRoleToAdmin, deleteAdmin, updatePass, updateRole } from "../../controllers/admin/adminAction";
import { authenticateUser } from "../../middlewares/auth";
import { addToMaster, deleteFieldInMaster, getFieldDataFromMaster, updateMaster, uploadInstrt } from "../../controllers/forms/masterController";
import { getControls, getAllAdmins, getDashboard } from "../../controllers/admin/data";
import { addFieldsToConfig, addToConfig, deleteFieldInConfig, getFieldDataFromConfig, updateConfig } from "../../controllers/forms/configController";
import { getUserData } from "../../controllers/student/index";
import { addToQExamConfig, deleteQExamConfig, getFieldDataFromQualifyingExam, updateQExamConfig } from "../../controllers/forms/qualifyingExamController";
import { addToSubject, getFieldDataFromSubConfig, updateSubConfig } from "../../controllers/forms/subjectController";
import { addToEnCOnfig, getFieldDataFromEntranceConfig, updateEntConfig } from "../../controllers/forms/entranceExamCtler";

const adminActionRouter=express.Router()




adminActionRouter.post("/add-admin",authenticateUser(false),addAdmin)
adminActionRouter.delete("/:id/:userId/:roleId/delete-admin",authenticateUser(true),deleteAdmin)
adminActionRouter.post("/:userId/update-password",authenticateUser(true),updatePass)

adminActionRouter.post("/user-defs/add-role",authenticateUser(false),addNewRole)
adminActionRouter.post("/user-defs/update-role",authenticateUser(false),updateRole)
adminActionRouter.post("/user-defs/allocate-roleMenu",authenticateUser(false),allocateRoleMenu)
adminActionRouter.post("/user-defs/:userId/allocate-role",authenticateUser(false),allocateRoleToAdmin)



// admin dashboard
adminActionRouter.get("/",authenticateUser(false),getUserData('admins'))
adminActionRouter.get("/all-admins/:schoolId",authenticateUser(true),getAllAdmins)
adminActionRouter.get("/controls",authenticateUser(false),getControls)
adminActionRouter.get("/:schoolId/dashboard",authenticateUser(false),getDashboard)


// for master
adminActionRouter.post("/master/:id/add",authenticateUser(false),uploadInstrt,addToMaster)
adminActionRouter.get("/master/:id/:field",authenticateUser(false),getFieldDataFromMaster)
adminActionRouter.post("/master/:masterId/:field/:subId/update",authenticateUser(false),uploadInstrt,updateMaster)
adminActionRouter.delete("/master/:masterId/:field/:subId/delete",authenticateUser(false),deleteFieldInMaster)


adminActionRouter.post("/qexam/:id/add",authenticateUser(false),addToQExamConfig)
adminActionRouter.get("/qexam/:id/:field",authenticateUser(false),getFieldDataFromQualifyingExam)
adminActionRouter.post("/qexam/:qexamId/:field/:subId/update",authenticateUser(false),updateQExamConfig)
adminActionRouter.delete("/qexam/:qexamId/:field/:subId/delete",authenticateUser(false),deleteQExamConfig)
adminActionRouter.post("/add",addNewConfig)


adminActionRouter.post("/config/:id/add",authenticateUser(false),addToConfig)
adminActionRouter.get("/config/:id/:field",authenticateUser(false),getFieldDataFromConfig)
adminActionRouter.post("/config/:id/addField",authenticateUser(false),addFieldsToConfig)
adminActionRouter.post("/config/:configId/:field/:subId/update",authenticateUser(false),updateConfig)
adminActionRouter.delete("/config/:configId/:field/:subId/delete",authenticateUser(false),deleteFieldInConfig)

adminActionRouter.post("/subconfig/:id/add",authenticateUser(false),addToSubject)
adminActionRouter.get("/subconfig/:id/:field",authenticateUser(false),getFieldDataFromSubConfig)
adminActionRouter.post("/subconfig/:subconfigId/:field/:subId/update",authenticateUser(false),updateSubConfig)

adminActionRouter.post("/entconfig/:id/add",authenticateUser(false),addToEnCOnfig)
adminActionRouter.get("/entconfig/:id/:field",authenticateUser(false),getFieldDataFromEntranceConfig)
adminActionRouter.post("/entconfig/:entconfigId/:field/:subId/update",authenticateUser(false),updateEntConfig)
// adminActionRouter.delete("/subconfig/:subconfigId/:field/:subId/delete",authenticateUser(false),deleteQExamConfig)


export {adminActionRouter}


