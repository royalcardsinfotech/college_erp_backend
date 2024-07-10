import { Request, Response, NextFunction } from "express";
import { createError, createResponse } from "../../utils/response-handler";
import { CustomRequest } from "../../utils/customrequest";
import { UserModel } from "../../models/user";
import { MasterModel } from "../../models/master";
import { ConfigModel } from "../../models/configuration";
import { CredentialModel } from "../../models/credential";
import { RoleModel } from "../../models/role";
import { AppliModel } from "../../models/formSubmission";
import mongoose from "mongoose";
import { AdminModel } from "../../models/admin";



export const getControls = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const cred = await CredentialModel.findById(req.data!.credId)
    if (!cred) {
      return res.status(404).json(createError(404, "error", "not found"))
    }
    const user = await UserModel.findById(cred.userId)

    const master = await MasterModel.findOne({ schoolId: user!.schoolId })
    const config = await ConfigModel.findOne({ schoolId: user!.schoolId })
    res.status(200).json(createResponse("success", { master, config }))
  } catch (error) {
    console.log(error)
    res.status(500).json(createError(500, "error", "internal server error"))
  }
}


// getting all data... like no of registrations, confirmed applications, payment status etc
export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id=req.params.schoolId
    console.log(id)
    const totalReg = await UserModel.find({ schoolId: id})
    const data = await AppliModel.aggregate(
      [
        {
          $match: { schoolId:new  mongoose.Types.ObjectId(id) }  // Filter by the 'school' field
        },
        {
          $facet: {
            courseCounts: [
              {
                $group: {
                  _id: "$course",          // Group by the 'course' field
                  count: { $sum: 1 }       // Count the number of documents in each group
                }
              },
              {
                $project: {
                  _id: 0,                  // Exclude the _id field
                  course: "$_id",          // Rename _id to course
                  count: 1                 // Include the count field
                }
              },
              {
                $sort: { count: -1 }       // Optional: Sort by count in descending order
              }
            ],
            statusCounts: [
              {
                $group: {
                  _id: "$status",          // Group by the 'status' field
                  count: { $sum: 1 }       // Count the number of documents in each group
                }
              },
              {
                $project: {
                  _id: 0,                  // Exclude the _id field
                  status: "$_id",          // Rename _id to status
                  count: 1                 // Include the count field
                }
              },
              {
                $sort: { count: -1 }       // Optional: Sort by count in descending order
              }
            ],
            paymentCounts: [
              {
                $group: {
                  _id: "$paymentStatus",         // Group by the 'payment' field
                  count: { $sum: 1 }       // Count the number of documents in each group
                }
              },
              {
                $project: {
                  _id: 0,                  // Exclude the _id field
                  payment: "$_id",         // Rename _id to payment
                  count: 1                 // Include the count field
                }
              },
              {
                $sort: { count: -1 }       // Optional: Sort by count in descending order
              }
            ]
          }
        }
      ]
    )
    const d = data[0]
    d["regsCounts"] = totalReg.length
    res.status(200).json(createResponse("success", d))
  } catch (error) {
    res.status(500).json(createError(500, "error", "internal server error"))
  }
}

// getting  all admins

export const getAllAdmins = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { schoolId } = req.params
  const admins= await AdminModel.aggregate([
      {
        $match: {
          schoolId: new mongoose.Types.ObjectId(schoolId)
        }
      },
      {
        $lookup: {
          from: "credentials",
          localField: "userId",
          foreignField: "userId",
          as: "creds"
        }
      },
      {
        $unwind: "$creds"
      },
    
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userData"
        }
      },
      {
        $unwind: "$userData"
      }
    ])



    res.status(200).json(createResponse("data", admins))
  } catch (error) {
    console.log(error)
    res.status(500).json(createError(500, "error", "internal server error"))
  }
}