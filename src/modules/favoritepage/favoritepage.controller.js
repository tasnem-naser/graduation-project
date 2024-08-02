import { UserModel } from "../../../databases/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"


const addfavoritepage = catchError(async(req,res,next)=>{
    let favoritepage = await UserModel.findByIdAndUpdate(req.user._id, {$addToSet:{favoritepage:req.body.product}},{new:true}).populate('favoritepage')
    !favoritepage && res.status(403).json({message:"No favoritepage found"})
    favoritepage && res.json({message:"success",favoritepage: favoritepage.favoritepage})
})

const removefavoritepage = catchError(async(req,res,next)=>{
    let favoritepage = await UserModel.findByIdAndUpdate(req.user._id, {$pull:{favoritepage:req.params.id}},{new:true})
    !favoritepage && res.status(403).json({message:"No favoritepage found"})
    favoritepage && res.json({message:"success",favoritepage:favoritepage.favoritepage})
})



const getuserfavoritepage = catchError(async(req,res,next)=>{
    let {favoritepage}= await UserModel.findById(req.user._id).populate('favoritepage')
    !favoritepage && res.status(403).json({message:"No favoritepage found"})
    favoritepage && res.json({message:"success",favoritepage})
})






export{
    addfavoritepage,
    removefavoritepage,
    getuserfavoritepage 
    
}