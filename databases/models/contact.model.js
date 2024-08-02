import mongoose from "mongoose";

const schema = new mongoose.Schema({
    Name:{
        type:String,
        trim:true,
        required:[true,"name must be entered"],
        minLength:[2,"Username is too short"]
    },
    email:{
        type:String,
        lowerCase: true,
        trim:true,
        required:[true,"Email must be exist"]
    },
    message:{

        type: String,
        trim: true,
        requied: true,
        minlength: [50,'too short message'],
        maxlength: [1500,'too long message']
    
    
       },
})

export const contactModel =  mongoose.model("contact", schema);