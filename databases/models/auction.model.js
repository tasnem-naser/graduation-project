import mongoose from 'mongoose'

const AuctionSchema = new mongoose.Schema({
  ProductId : {
     type: String,
     required: true, 
    min:2,
    max:100, 
    },
  UserId:
   {
     type: String,
    required: true,
    min:2,
    max:100, 
     
  },
  fristPrice: 
  { type: Number,
    required: true,
   
  },
  highestPrice: 
  { type: Number,
    required: true,
  
  }
});
 export const AuctionModel= mongoose.model('Auction', AuctionSchema);