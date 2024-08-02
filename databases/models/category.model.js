import mongoose from "mongoose";

const schema = new mongoose.Schema({

    name:{
        type: String,
        unique: [true,'name is required'],
        trim: true,
        requied: true,
        minlength: [2,'too short category name']

    },
    slug:{
        type: String,
        lowecase: true,
        requied: true
   },
   image: String

},{timestamps: true})


schema.post('init', function(doc){

    //doc.image="https://robbikya.onrender.com/"+"uploads/"+doc.image
})

export const categorymodel = mongoose.model('category',schema)