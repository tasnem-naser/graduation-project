import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { cartModel } from "./cart.model.js";
const schema= new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:[true,"First name must be entered"],
        minLength:[2,"name is too short"]
    },
    lastName:{
        type:String,
        trim:true,
        required:[true,"Last name must be entered"],
        minLength:[2,"name is too short"]
    },
    userName:{
        type:String,
        trim:true,
        required:[true," User name must be entered"],
        unique:[true,"This username is already exists"],
        minLength:[2,"Username is too short"]
    },
    email:{
        type:String,
        lowerCase: true,
        trim:true,
        required:[true,"Email must be exist"]
    },
    password:{
        type:String,
        minlength:[8,"Password is too short"],
        required:[true,"Please provide a password"]
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number, 
        required:[true,"You must provied your phone number"],
        maxlength:[11,"Invalid phone number"],
        minlength:[11,"Invalid phone number"],
        unique:true
    },
    Gender:{
        type:String,
        enum:["Male","Female"],
        default:"Male"
    },
    DOB:Date,
    Age:{
        type:Number,
        min:['16',"You are too young to register here"]
    },
    image:String,
    role:{
        type:String,
        enum:["User","Admin"],
        default:"User"
    },
    numberOfOrder:Number,
    status: {
        type: String,
        enum: ["online", "offline"],
        default: "offline",
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    passwordChangedAt: Date,
    logoutAt: Date,
    otp: String,
    otpExpiry: Date,


    favoritepage:[{
        type:mongoose.Types.ObjectId,
        ref:'product'
    }],
    cart:{
        type:mongoose.Types.ObjectId,
        ref:'Cart'
    },
   
},

    {timestamps:true})

    schema.post('init', function(doc){

       // doc.image="https://robbikya.onrender.com/"+"uploads/"+doc.image
    })
    schema.pre('findOneAndUpdate',function(){
        // this.__update.password = bcrypt.hashSync(this.password,8)
    })
    schema.pre('save',async function(next){
        // this.__update.password = bcrypt.hashSync(this.password,8)
       const cart= await cartModel.create({
            user: this._id,
            //we can use $addtoSet
       
             cartItems: [],
           });
           this.cart= cart._id
    })
    
    schema.methods.hashPass= async function (){
        this.password =await bcrypt.hash(this.password,10)
    }
export const UserModel =mongoose.model("User",schema)
