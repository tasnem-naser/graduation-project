
import slugify from "slugify"
import { categorymodel } from "../../../databases/models/category.model.js"
import { catchError } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dpsp3oq9x', 
  api_key: '435615528978193', 
  api_secret: 'dX0u1peCmgM4jMa6xQVjfuyKL68' 
});


const addcategory =  catchError(async(req,res,next)=>{

  req.body.slug = slugify(req.body.name) 
 cloudinary.uploader.upload(req.file.path, async(error, result) =>{
   req.body.image=result.secure_url 
   let category = new categorymodel(req.body)
   await category.save()
   res.json({message:"suceess",category})
 })
       
 
})


const getallcategories =  catchError(async(req,res,next)=>{   
       
  let apiFeatures = new ApiFeatures(categorymodel.find(),req.query).pagination().filter().sort().fields().search()
  let categories= await apiFeatures.mongooseQuery
    
    res.json({message:"suceess",page : apiFeatures.pageNumber,categories})

})

const getsinglecategory =  catchError(async(req,res,next)=>{   
    let category= await categorymodel.findById(req.params.id)
    !category && res.status(404).json({message:"category is not found"})
    category&&res.json({message:"suceess",category})
})

cloudinary.config({ 
  cloud_name: 'dpsp3oq9x', 
  api_key: '435615528978193', 
  api_secret: 'dX0u1peCmgM4jMa6xQVjfuyKL68' 
});


const updatecategory =  catchError(async(req,res,next)=>{
  if(req.body.name)  req.body.slug = slugify(req.body.name)
  if(req.file) cloudinary.uploader.upload(req.file.path, async(error, result) =>{
    req.body.image=result.secure_url 
   let category = await categorymodel.findByIdAndUpdate(req.params.id , req.body , {new:true})
   !category && res.status(404).json({message:"category is not found"})
   category&&res.json({message:"suceess",category})
   })
  })


const deletecategory =  catchError(async(req,res,next)=>{
   let category = await categorymodel.findByIdAndDelete(req.params.id)
   !category && res.status(404).json({message:"category is not found"})
   category&&res.json({message:"suceess",category})
   })


    




export{
    addcategory,
    getallcategories,
    getsinglecategory,
    updatecategory,
    deletecategory
}


