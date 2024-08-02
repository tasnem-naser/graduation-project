import { contactModel } from "../../../databases/models/contact.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"




const addcontact = catchError(async(req,res,next)=>{   
    let contact = new contactModel(req.body)
     await contact.save()
     res.json({message:"suceess"})

})

const getcontact = catchError(async(req,res,next)=>{
    let contact = await contactModel.find()
    !contact && next(new AppError("error", 404));
    contact && res.json({ message: "success", contact });
})




export{
    addcontact,
    getcontact
}