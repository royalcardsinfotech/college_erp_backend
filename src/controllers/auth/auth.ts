import { Request, Response, NextFunction } from 'express'
import { decryptData, encryptData, generateEncryptedToken } from '../../utils/jwt'
import { OAuth2Client } from 'google-auth-library'
import { apiUrl, cookieExpiryTime, encryptionKey, environment, googleclientId, ivkey } from '../../utils/secretkeys'
import { StudentModel } from '../../models/student'
import { createError, createResponse } from '../../utils/response-handler'
import { deleteOtp, emailTemplate, fpuuid, generateOTP, otpStore, sendEmail, verifyOTP } from '../../utils/email_sender'
import { CredentialModel } from '../../models/credential'
import { UserModel } from '../../models/user'
import { RoleModel } from '../../models/role'
import { CustomRequest } from '../../utils/customrequest'
import { SchoolModel } from '../../models/school'
import { v4 } from 'uuid'
import path from 'path'


// registering new student
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, password, sch_code } = req.body
  const user = await CredentialModel.findOne({ email: email })

  if (user) {
    return res.status(400).json(createError(400, "login", "Please use another email address or sign in to your existing account."))
  }

  const school = await SchoolModel.findOne({ school_code: sch_code })
  if (!school) {
    return res.status(404).json(createError(404, "login", "Please register from valid school"))
  }

  // encrypting password and initialising database entry for the user
  const encPass = encryptData(password, encryptionKey!, ivkey!)


  let newUser = new UserModel({
    name: name,
    schoolId: school?._id, lastlogin: Date.now()
  })
  await newUser.save()

  let cred = new CredentialModel({
    userId: newUser._id,
    email: email,
    password: encPass,
    phone: phone

  })
  await cred.save()
  let newStu = new StudentModel({
    userId: newUser._id

  })
  await newStu.save()

  if (environment !== "TEST") {

    const otpCode = generateOTP(email);
    const data = {
      otp: otpCode
    }
    sendEmail(email, data, emailTemplate, "your otp");
  }

  const etoken = await generateEncryptedToken("", newUser._id.toString(), cred._id.toString())
  res.cookie('token', etoken, { httpOnly: environment === "PROD", secure: true, signed: true, maxAge: cookieExpiryTime, sameSite: "none" })
return  res.status(200).json(createResponse("success", { ...newUser._doc, role: {role_code:"STU",description:"student",allocatedRoles:{},schoolId:school._id,_id:""}, roleData: newStu, email: email, phone: phone }))
}


// login by user

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { loginId, password } = req.body
  // checking if user is registered by email or phone
  let cred = await CredentialModel.findOne({ email: loginId }) || await CredentialModel.findOne({ phone: loginId })

  if (!cred) {
    return res.status(400).json(createError(400, "login", "Login failed. Please check your credentials."))
  }


  
  if (password) {
    // getting decrypted password from stored password
    const decrypted_stored_password=await decryptData(cred!.password!.toString())

    if (decrypted_stored_password!= password) {
      // incorrect password
      return res.status(400).json(createError(404, "login", "Login failed. Please check your credentials."))
    }
  }

  
// user authenticated and now fetching basic info for them

  let user = await UserModel.findById(cred?.userId)
  user!.lastlogin = Date.now()
  await user?.save()

  const data = await UserModel.aggregate([
    {
      $match: { _id: cred?.userId }
    },
    {
      $lookup: {
        from: 'students',
        localField: '_id',
        foreignField: "userId",
        as: "roleData"
      }
    }, {
      $unwind: "$roleData"
    }

  ])
  data[0]["role"]={role_code:"STU",description:"student",allocatedRoles:{},schoolId:user?.schoolId,_id:""}

  
// getting  encrypted  jwt token with payload :
//  - roleId
//  - userId
//  - credentialId

  const etoken = await generateEncryptedToken(data[0].role._id.toString(), cred!.userId.toString(), cred!._id.toString())
  // const etoken=await generateEncryptedToken("hi","this is","aditya")

  // res.set("x-auth-token",etoken)
  data[0]["email"] = cred?.email
  data[0]["phone"] = cred?.phone
  data[0]["token"] = etoken

  res.cookie('token', etoken, { httpOnly: environment === "PROD", secure: true, signed: true, maxAge: cookieExpiryTime, sameSite: "none" })
  return res.status(200).json(createResponse("success", data[0]))
}


// google login only for students
export const googlelogin = async (req: Request, res: Response, next: NextFunction) => {
  const { idToken, sch_code } = req.body;
  const client = new OAuth2Client(googleclientId);

  try {
    // verify the idToken	
    const ticket = await client.verifyIdToken({
      idToken,
      audience: googleclientId
    });
    const payload = ticket.getPayload();


    // fetching basic details from the payload
    const email = payload!.email;
    const name = payload!.name;
    const profilepic = payload!.picture

    const school = await SchoolModel.findOne({ school_code: sch_code })
    if (!school) {
      return res.status(404).json(createError(404, "login", "school not found"))
    }
    const cred = await CredentialModel.findOne({ email: email })

    if (!cred) {
      // if user is not registered
      let newUser = new UserModel({
        name: name, lastlogin: Date.now(), schoolId: school._id
      })
      await newUser.save()

      let cred = new CredentialModel({
        userId: newUser._id,
        email: email,
      })
      await cred.save()
      let newStu = new StudentModel({
        userId: newUser._id,
        profileUrl: profilepic,
        googleUser: true,
        verified: true

      })
      await newStu.save()
      const etoken = await generateEncryptedToken("", newUser._id.toString(), cred._id.toString())
      res.cookie('token', etoken, { httpOnly: environment === "PROD", secure: true, signed: true, maxAge: cookieExpiryTime, sameSite: "none" })
      return res.status(200).json(createResponse("success", { ...newUser._doc, role: {role_code:"STU",description:"student",allocatedRoles:{},schoolId:school._id,_id:""}, roleData: newStu, email: email, phone: "" }))
    } else {
      // if user is already registered

      let user = await UserModel.findById(cred?.userId)
      user!.lastlogin = Date.now()
      user!.schoolId = school._id
      await user?.save()
      const data = await UserModel.aggregate([
        {
          $match: { _id: cred?.userId }
        },
         {
          $lookup: {
            from: 'students',
            localField: '_id',
            foreignField: "userId",
            as: "roleData"
          }
        }, {
          $unwind: "$roleData"
        }

      ])
      data[0]["role"]={role_code:"STU",description:"student",allocatedRoles:{},schoolId:user?.schoolId,_id:""}
      const etoken = await generateEncryptedToken(data[0].role._id.toString(), cred!.userId.toString(), cred!._id.toString())
      data[0]["email"] = cred?.email
      data[0]["phone"] = cred?.phone
      data[0]["token"] = etoken
      res.cookie('token', etoken, { httpOnly: environment === "PROD", secure: true, signed: true, maxAge: cookieExpiryTime, sameSite: "none" })
      return res.status(200).json(createResponse("success",data[0]))
    }

  } catch (error) {
    console.error('Google Sign-In failed:', error);
    res.status(500).json(createError(500, "google signin", "Something went wrong")); // Send unauthorized response
  }
}


// verify user by otp
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body
    const verified = verifyOTP(email, otp.toString())
    if (verified) {
      deleteOtp(email)
      let cred = await CredentialModel.findOne({ email: email })
      let user = await StudentModel.findOne({ userId: cred?.userId })
      user!.verified = true
      await user!.save()
      res.status(200).json(createResponse("success", user))
    }
    res.status(500).json(createError(400, "otp verification", "enter correct otp"));
  } catch (error) {
    res.status(500).json(createError(500, "otp verification", "internal server error"));
  }
}


// resend otp to user
export const sendOtp = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params
    const user = await CredentialModel.findById(req.data?.credId)
    if (user) {

      const storedOTP = otpStore[email]
      if (storedOTP) {
        // otp store has already this user
        const { otp, timestamp } = storedOTP;
        const currentTime = Date.now();
        const timeDifference = currentTime - timestamp;
        const remainingTimeInMinutes = Math.ceil((180000 - timeDifference) / 60000);
        if (timeDifference < 180000) {
          // user trying to resend before 3 min--denied
          return res.status(400).json(createError(400, "otp", `try again after ${remainingTimeInMinutes} min`))
        } else {
          // otp sent
          const otpCode = generateOTP(email);
          const data = {
            otp: otpCode
          }
          sendEmail(email, data, emailTemplate, "your otp")
          return res.status(200).json(createResponse(`otp sent to ${email}`, {}))
        }
      } else {

        // no user in otp store
        const otpCode = generateOTP(email);
        const data = {
          otp: otpCode
        }
        sendEmail(email, data, emailTemplate, "your otp")
        return res.status(200).json(createResponse(`otp sent to ${email}`, {}))
      }

    } else {
      res.status(400).json(createError(404, "otp", "user not found"))
    }
  } catch (error) {
    res.status(500).json(createError(500, "otp sending", "internal server error"));
  }
}

// logout user
export const logout = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token")
    res.status(200).json(createResponse("logout", {}))
  } catch (error) {
    res.status(500).json(createError(500, "logout", "internal server error"));
  }
}

// sending password reset link to user
export const sendPassowrdResetLink = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    const cred = await CredentialModel.findOne({ email: email })
    if (!cred) {
      return res.status(400).json({ msg: 'User with this email does not exist!' })
    }


    // not allowing  sending another link before 10 min

    if (fpuuid[cred._id.toString() as string]) {
      const t = fpuuid[cred._id.toString() as string].timestamp
      if (Date.now() - t < 600000) {
        const elapsedTime = Date.now() - t;
        const remainingTimeInMinutes = Math.ceil((600000 - elapsedTime) / 60000);
        return res.status(500).json({ msg: `try again after some ${remainingTimeInMinutes} min` })
      }
    }

    const uuid = v4();
    // generating link to server password reset page from backend itself with uuid and credential Id
    const link = `${apiUrl}/auth/forgot-password/${uuid}?id=${cred._id}`
    const timestamp = Date.now()
    // creating identity using combination of uuid and credential id
    const identity = `${uuid}${cred._id}`
    // setting cred._id to store info regarding otp sent like who sent and time of sending
    fpuuid[cred._id.toString()] = { uid: identity, timestamp }
    const data = {
      resetLink: link
    }
    sendEmail(email, data, emailTemplate, "your password reset link")
    res.status(200).json(createResponse("email link  sent to email " + email, {}))
  } catch (error) {
    res.status(500).json(createError(500, "pass link", "internal server error"));
  }
}

export const getPasswordPortal = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { uuid } = req.params
    const { id } = req.query
    // creating  identity from url  to verify the user
    const identity = `${uuid}${id}`

    if (fpuuid[id as string]) {
      // user is verified and link is valid
      const currentTime = Date.now();
      const timeDifference = currentTime - fpuuid[id as string].timestamp;
      if (fpuuid[id as string].uid === identity && timeDifference < 600000) {
        // password reset link has been accessed before 10 min of sending
        const filePath = path.join(__dirname, '../../uploads/resetpass.html');
        res.sendFile(filePath);
      } else {
        // accessing after 10 min or  identity has been tempered
        if (fpuuid[id as string].uid != identity) {
          // identity tempered
          res.render('session-expired', { msg: "INVALID LINK" });

        } else {
          // accessing after 10 min
          res.render('session-expired', { msg: "SESSION EXPIRED" });
        }
      }

    } else {
      // user is not verified
      res.render('session-expired', { msg: "SESSION EXPIRED" });
    }
  } catch (error) {
    res.status(500).json(createError(500, "passlink", "internal server error"));
  }
}


// updating password of user
export const updatePassword = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id, password } = req.body
  let admin = await CredentialModel.findById(id)

  if (admin) {

    admin!.password = encryptData(password, encryptionKey!, ivkey!)
    await admin?.save()
    delete fpuuid[id as string]
    res.status(200).json(createResponse("success", {}))
  }
  else {
    res.status(404).json(createError(404, "password update", "not found"))
  }
}