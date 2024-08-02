import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  orderName: {
     type: String,
     required: true, 
    min:2,
    max:100, 
    },
  opinion:
   {
     type: String,
    required: true,
    min:50,
    max:1000,  
  },
  price: 
  { type: Number,
    required: true,
   
  },
  reason:{
     type: String,
    required: true,
    min:50,
    max:1000,  }
});
export const technicalModel  = mongoose.model('technical', Schema);

