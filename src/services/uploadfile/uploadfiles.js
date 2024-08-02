import multer from "multer";
import { v4 as uuidv4 } from "uuid"
import mongoose from "mongoose";
import { AppError } from "../../utils/AppError.js";




export const fileupload =()=>{
    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null , 'uploads/')
        },
        filename: (req,file,cb) => {
            cb(null , new mongoose.Types.ObjectId + "-" + file.originalname)
        }
    })
    function fileFilter(req,file,cb){
        if (file.mimetype.startsWith('image')){
            cb(null ,true)
    }else{
        cb(new AppError('image only',401),false)


    }
}
const upload= multer({storage , fileFilter})
return upload
}


export const uploadsinglefile = fieldName => fileupload().single(fieldName)
export const uploadArrayoffiles = fieldName => fileupload().array(fieldName,10)
export const uploadfields = fields => fileupload().fields(fields)