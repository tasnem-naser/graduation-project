import { productmodel } from "../../../databases/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import slugify from "slugify"
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dpsp3oq9x', 
  api_key: '435615528978193', 
  api_secret: 'dX0u1peCmgM4jMa6xQVjfuyKL68' 
});



export const uploadMultipleImages = async (images, folder) => {
  const uploadPromises = images.map(image => 
    cloudinary.uploader.upload(image.path, { folder })
  );
  const uploadResults = await Promise.all(uploadPromises);
  return uploadResults.map(({ secure_url, public_id }) => ({ secure_url, public_id }));
};


const addproduct = catchError(async (req, res, next) => {
      req.body.slug = slugify(req.body.name);
     
      const coverUploadResult = await cloudinary.uploader.upload(req.files.imgCover[0].path);
      req.body.imgCover = coverUploadResult.secure_url;

      if (req.files.images?.length > 0) {
        
          const imagesUploadResults = await uploadMultipleImages(req.files.images, "products");
          req.body.images = imagesUploadResults;
      }

      const product = new productmodel(req.body);
      await product.save();

      res.json({ message: "success", product });
  })





const getallproducts =  catchError(async(req,res,next)=>{   
       
  let apiFeatures = new ApiFeatures(productmodel.find(),req.query).pagination().filter().sort().fields().search()
  let products= await apiFeatures.mongooseQuery

    
    res.json({message:"suceess",page : apiFeatures.pageNumber,products})

})

const getsingleproduct =  catchError(async(req,res,next)=>{   
    let product= await productmodel.findById(req.params.id)
    
    !product && res.status(404).json({message:"product is not found"})
    product&&res.json({message:"suceess",product})
})


cloudinary.config({ 
  cloud_name: 'dpsp3oq9x', 
  api_key: '435615528978193', 
  api_secret: 'dX0u1peCmgM4jMa6xQVjfuyKL68' 
});

const updateProduct = catchError(async (req, res, next) => {
  if (req.body.name)
      req.body.slug = slugify(req.body.name);
  
  if (req.body.imgCover) { 
      const coverUploadResult = await cloudinary.uploader.upload(req.files.imgCover[0].path);
      req.body.imgCover = coverUploadResult.secure_url;  }

      if (req.files.images?.length > 0) {
          const imagesUploadResults = await uploadMultipleImages(req.files.images, "products");
          req.body.images = imagesUploadResults;
      }
    

      let product = await productmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
      !product && res.status(404).json({ message: "Product is not found" });
      product && res.json({ message: "Success", product });
    
});

const deleteproduct =  catchError(async(req,res,next)=>{
   let product = await productmodel.findByIdAndDelete(req.params.id)
   !product && res.status(404).json({message:"product is not found"})
   product&&res.json({message:"suceess",product})
   })


    




export{
    addproduct,
    getallproducts,
    getsingleproduct,
    updateProduct,
    deleteproduct
}