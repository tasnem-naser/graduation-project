import Jwt from "jsonwebtoken";
import { UserModel } from "../../databases/models/user.model.js";
import { catchError } from "./catchError.js";
import { AppError } from "../utils/AppError.js";





const protectRoutes = catchError(async(req,res,next)=>{
  let {token}=req.headers 
  if(!token) return next(new AppError('not founded token',401))
  
  let decoded = Jwt.verify(token ,"secret_key")
  let user = await UserModel.findById(decoded.userId)  
  if(!user) return next(new AppError('not founded user',401))


  if(user.passwordchangedAt){
  let time =parseInt(user?.passwordchangedAt.getTime()/1000)
  if(time > decoded.iat)return next(new AppError('token invaild',401))
}
req.user = user
next();
})

export{
  protectRoutes
}