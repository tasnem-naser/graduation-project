
// import { order} from "../../../Databases/Models/user.model.js"
import  Jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { UserModel } from "../../../databases/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { sendEmailPcode } from "../../services/emails/sentEmailPinCode.js"
import { AppError } from "../../utils/AppError.js"

import {v2 as cloudinary} from 'cloudinary';
import { ApiFeatures } from "../../utils/ApiFeatures.js"
          
cloudinary.config({ 
  cloud_name: 'dpsp3oq9x', 
  api_key: '435615528978193', 
  api_secret: 'dX0u1peCmgM4jMa6xQVjfuyKL68' 
});





const signUp=catchError(async(req,res,next)=>{
  cloudinary.uploader.upload(req.file.path, async(error, result) =>{
   req.body.image=result.secure_url 
    let user= new UserModel(req.body)
    console.log(user)
   await user.hashPass()
   await user.save()
   //console.log(user)
   let token=Jwt.sign({userId:user._id,role:user.role},"secret_key");
    res.status(201).json({ message: "success" ,user:user._id,token});
})
})


const signIn = catchError(async (req, res, next) => {
  const { emailOrMobile,password } = req.body;
  let user = await UserModel.findOne({
    $or: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }],
  });
  console.log(user)
  if (user && bcrypt.compareSync(password, user.password)) {
    await UserModel.findByIdAndUpdate(user._id, { status: "online" });
    let token = Jwt.sign(
      { userId: user._id, role: user.role },
      "secret_key"
    );
    return res.status(201).json({ message: "success",user:user._id,token });
  }
  
return next(new AppError("email or password incorrect", 401));
})


const getAllUsers=catchError(async(req,res,next)=>{
  let apiFeatures = new ApiFeatures(UserModel.find(),req.query).pagination().filter().sort().fields().search()
  let users= await apiFeatures.mongooseQuery
 res.json({message:"Success", page : apiFeatures.pageNumber,users})})

 const getProfileData = catchError(async (req, res, next) => {
  //let user = req.user;
  const user = await UserModel.findById(req.user._id).select("-password").populate("cart");
  !user && next(new AppError("not user found", 404));
  user && res.json({ message: "success", user });
});

  const updateuser =  catchError(async(req,res,next)=>{
    
     let user = await UserModel.findByIdAndUpdate(req.params.id , req.body , {new:true})
     !user && res.status(404).json({message:"user is not found"})
     user&&res.json({message:"suceess",user})
     })
  

const UpdatePassword = catchError(async (req, res, next) => {
  let user = await UserModel.findById(req.user._id);
  if (user && bcrypt.compareSync(req.body.currentPassword, user.password)) {
    let token = Jwt.sign(
      { userId: user._id, role: user.role },
      "secret_key"
    );
    const hashPass = await bcrypt.hash(req.body.newPassword, 8);
    await UserModel.findByIdAndUpdate(req.user._id, {
      password: hashPass,
      passwordChangedAt: Date.now(),
    });
    return res.json({ msg: "success", token });
  }
  next(new AppError("password incorrect", 401));
});

const deleteUser=catchError(async(req,res,next)=>{
    let user= await UserModel.findByIdAndDelete(req.params.id)
    if(!user) return res.status(404).json( {message:'User not found!'})
    res.json({message:"Success",user})
})

const getAllUserOrders=catchError(async(req,res,next)=>{
    let userId=req.params.id
    let user=await UserModel.findById(userId)
    if( !userId){
        res.status(404).json( {message:'User not found!'})
    }else{
        let orders= await Order.find({})
        !orders&& res.status(404).json({message:"No Order Found!"});
        res.json({message:"Success",orders})
    } 
})


 
  const forgetPassword = catchError(async (req, res, next) => {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next(new AppError("not user found"));
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await sendEmailPcode(user.email,otp);
    await user.save();
    res.status(200).json({ message: "success", otp });
  });
  
  const resetPassword = catchError(async (req, res, next) => {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next(new AppError("not user found"));
    if (user.otp !== req.body.otp || new Date() > user.otpExpiry)
      return next(new AppError("Invalid or expired OTP", 401));
    user.password = req.body.newPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    await user.hashPass();
    res.status(200).json({ message: "Password reset successfuly" });
  });
  
const logout = catchError(async (req, res, next) => {
    await UserModel.findByIdAndUpdate(req.user._id, {
      logoutAt: Date.now(),
      status: "offline",
    });
    res.status(200).json({ message: "you logOut successfuly" });
  });
 

export{
    signUp,
    signIn,
    getAllUsers,
    getProfileData,
    updateuser,
    deleteUser,
    UpdatePassword,
    logout,
    forgetPassword,
    resetPassword,
    getAllUserOrders

    
}



