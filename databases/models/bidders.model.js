import mongoose from "mongoose";
const schema = new mongoose.Schema({
    productId:{
        type:mongoose.Types.ObjectId,
        ref:'product'
    },
    Bidders:[mongoose.Schema.Types.Mixed]
    
})
export const BiddersModel = mongoose.model('bidders',schema) 