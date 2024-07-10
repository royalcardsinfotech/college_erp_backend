import multer from "multer";
import fs from "fs"
import path from "path";
import { CustomRequest } from "./customrequest";

const uploadDir=path.join(__dirname,"..","uploads")
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination: function (req:CustomRequest, file, cb) {
      cb(null, uploadDir); 
    },
    filename: function (req:CustomRequest, file, cb) {
        const fileName = req.fieldName + '-' + Date.now() + path.extname(file.originalname); 
        console.log(fileName)
    const fileDestination = fileName; 
    cb(null, fileName);
    req.data={userId:"",roleId:"",credId:""}
    req.data!.file = fileDestination ;
    
    }
  })

const upload =multer({ 
    storage: storage,
    limits:{
        fileSize:1024*1024,
        files:1,
        fieldSize:1024*1024
    },
// fileFilter(req:CustomRequest, file, callback) {
//         const allowedMimeTypes=['image/png','image/jpeg','image/jpg','application/pdf']
        
//         if(!allowedMimeTypes.includes(file.mimetype)  ){
//             req.multerError="file should be image or pdf only"
//              callback(null,false)
            
//         }else{
//              callback(null,true);
//         }
//     },
   
}).single("file");

export {upload}