import mongoose from "mongoose";

const schema = new mongoose.Schema({

    name:{
        type: String,
        unique: [true,'name is required'],
        trim: true,
        requied: true,
        minlength: [2,'too short subcategory name']

    },
    slug:{
        type: String,
        lowecase: true,
        requied: true
   },
     category: {
        type:mongoose.Types.ObjectId,
         ref:'category'
     },

},{timestamps: true})

schema.pre('find',function(){
    this.populate('category')
})


export const subcategorymodel =mongoose.model('subcategory',schema)