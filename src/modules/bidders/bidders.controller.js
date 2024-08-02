import { BiddersModel } from "../../../databases/models/bidders.model.js";
import { catchError } from "../../middleware/catchError.js";

const addBidders= catchError(async(req,res,next)=>{
    let bidder = await BiddersModel.find({ productId: req.body.productId })
   
  if(bidder.length==0) {
   
    await BiddersModel.insertMany({"productId":req.body.productId,"Bidders" : {
        customer:req.user._id,
        offerPrice:req.body.offerPrice
        }})
  }
  
  else{
    
 await BiddersModel.findOneAndUpdate({productId:req.body.productId},{ $push: { "Bidders":  {
    customer:req.user._id,
    offerPrice:req.body.offerPrice
    } } })
   
  }
  res.json({message:"Done"})
})



export{
    addBidders
}