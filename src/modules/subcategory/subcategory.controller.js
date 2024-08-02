import { subcategorymodel } from "../../../databases/models/subcategory.model.js"
import { catchError } from "../../middleware/catchError.js"
import slugify from "slugify"
import { ApiFeatures } from "../../utils/ApiFeatures.js"

const addsubcategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)    
    let subcategory = new subcategorymodel(req.body)
     await subcategory.save()
     res.json({message:"suceess",subcategory})

})

const getallsubcategories= catchError(async(req,res,next)=>{  
    let filterObj = {}
    if(req.params.category)
    {
        filterObj.category = req.params.category
    }

    

    let apiFeatures = new ApiFeatures(subcategorymodel.find(filterObj),req.query).pagination().filter().sort().fields().search()
    let subcategories = await apiFeatures.mongooseQuery
    res.json({message:"success",page : apiFeatures.pageNumber,subcategories})
})


const getsinglesubcategory =catchError(async(req,res,next)=>{
    let subcategory = await  subcategorymodel.findById(req.params.id)
   !subcategory && res.status(404) .json({message:'Category Not Found'})
   subcategory && res.json({message: 'Success',subcategory})
})

const updatesubcategory = catchError(async(req,res,next)=>{
   if(req.body.name) req.body.slug = slugify(req.body.name) 
    let subcategory = await subcategorymodel.findByIdAndUpdate(req.body.params,req.body, {new:true})
    !subcategory && res.status(404) .json({message:'subCategory Not Found'})
    subcategory && res.json({message: 'Success',subcategory})
})


const deletesubcategory = catchError(async(req,res,next)=>{
    let subcategory = await subcategorymodel.findByIdAndDelete(req.body.params)
    !subcategory && res.status(404) .json({message:'subCategory Not Found'})
    subcategory && res.json({message: 'Success',subcategory})
})



export{
addsubcategory,
getallsubcategories,
getsinglesubcategory,
updatesubcategory,
deletesubcategory

}



