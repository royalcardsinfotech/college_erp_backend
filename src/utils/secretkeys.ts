import dotenv from "dotenv"
dotenv.config();
const secretKey=process.env.JWT_SECRET
const encryptionKey=process.env.ENCRYPTION_KEY
const ivkey=process.env.IV_KEY
const googleclientId=process.env.GOOGLE_CLIENT_ID
const mongodbUri=process.env.MONGODB_URI
const environment=process.env.ENVIRONMENT
const authguardpass=process.env.AUTH_GUARD_PASS
const cookieExpiryTime=3600000
const tokenExpiryTime="1h"
const apiUrl=process.env.SERVER_URL
const razorpay_id=process.env.KEY_ID
const razorpay_secret=process.env.KEY_SECRET
export {secretKey,encryptionKey,ivkey,googleclientId,mongodbUri,environment,cookieExpiryTime,tokenExpiryTime,authguardpass,apiUrl,razorpay_id,razorpay_secret}