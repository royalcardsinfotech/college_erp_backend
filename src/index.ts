import express,{Request,Response} from "express"
import mongoose from "mongoose"
import cors from "cors"
import client from "prom-client"
import resTime from "response-time"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { encryptionKey, mongodbUri } from "./utils/secretkeys"
import { router } from "./routers"
import compression from "compression"
import { authenticateUser } from "./middlewares/auth"
import path from "path"
import process from "node:process"
import { AuthGuard } from "./middlewares/authguard"
import { getPasswordPortal, updatePassword } from "./controllers/auth/auth"

dotenv.config();

const PORT=process.env.PORT || 3000
const app=express()
app.use(compression())
app.use(express.json())

app.use(cors(
  {
    origin: ["http://localhost:5173","https://erp-peach-pi.vercel.app"],
    credentials: true,
    allowedHeaders:["AuthguardPass","Content-Type"],
  }
))

app.use(cookieParser(encryptionKey))
const collectDefaultMetrics=client.collectDefaultMetrics
collectDefaultMetrics({register:client.register})

const reqResTime=new client.Histogram({
  name:"Erp_backend_req_res_time",
  help:"Time taken by req and res",
  labelNames:['method','route','status_code'],
  buckets:[1,50,100,200,400,500,700,1000,1500,2000]
})
app.use(resTime((req,res,time)=>{
  reqResTime.labels({

    method:req.method,
    route:req.url,
    status_code:res.statusCode
  }).observe(time)
}))
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,"..","views")); 

app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use("/receipts",express.static(path.join(__dirname,"receipts")))

app.get("/metrics",async (req,res)=>{
  res.setHeader('Content-Type',client.register.contentType)
  const metrics=await client.register.metrics()
  res.status(200).send(metrics)
})

app.get("/health",async (req:Request,res:Response)=>{
  const data={
    uptime:Math.floor(process.uptime()),
    cpuUsage:process.cpuUsage(),
    memoryUsage:process.memoryUsage()
  }
  res.status(200).json(data)
})

app.get("/auth/forgot-password/:uuid",getPasswordPortal)
app.post("/auth/reset-password",updatePassword)

app.use("/api/v1",AuthGuard,router)

mongoose.connect(mongodbUri!).then(async()=>{
   console.log("connected to mongodb")
 }).catch((e) => {
   console.log(e);
 });


app.listen(PORT,()=>{
  console.log("server started on port "+PORT)
})

