import express from "express";
import { addfield, deleteField } from "../../controllers/forms/fieldController";

const formRouter=express.Router()

formRouter.post("/create",addfield)
formRouter.delete("/:id",deleteField)

export{formRouter}