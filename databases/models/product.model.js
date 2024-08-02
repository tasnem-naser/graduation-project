
import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name:{
        type: String,
        unique: [true,'name is required'],
        trim: true,
        requied: true,
        minlength: [2,'too short product name']

    },
    slug:{
        type: String,
        lowecase: true,
        requied: true
   },

   description:{

    type: String,
    unique: [true,'name is required'],
    trim: true,
    requied: true,
    minlength: [50,'too short  product  description'],
    maxlength: [1500,'too long  product  description']


   },
   imgCover: String,

   images:[],

   price:{
    type: Number,
    required: true,
    min: 0,
   },  
   quality:{
    type :String ,
    enum:['Used like new','Used good','Used fair'],
    required:true,
    lowecase:true
   },
   category:{
    type: mongoose.Types.ObjectId,
    ref: 'category'
   },
   subcategory:{
    type: mongoose.Types.ObjectId,
    ref: 'subcategory'
   },



},{timestamps: true})

schema.post('init',function(doc){
    //if(doc.imgCover||doc.images){
   // doc.imgCover = "https://robbikya.onrender.com/" + "uploads/" + doc.imgCover;
    //doc.images = doc.images.map((img)=>"https://robbikya.onrender.com/" + "uploads/" + img)

}
)
export const productmodel =mongoose.model('product',schema)
