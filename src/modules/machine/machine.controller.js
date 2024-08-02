

import {v2 as cloudinary} from 'cloudinary';
import ImageClassifier from "../../utils/Image_Classifier.js";         
cloudinary.config({ 
  cloud_name: 'dpsp3oq9x', 
  api_key: '435615528978193', 
  api_secret: 'dX0u1peCmgM4jMa6xQVjfuyKL68' 
});





// // const classifier = new ImageClassifier();
// // const addPhoto=  catchError(async(req,res,next)=>{
// //     cloudinary.uploader.upload(req.file.path, async(error, result) =>{
// //         req.body.image=result.secure_url 
// // classifier.classifyImage(image).then((result) => {
// //     res.json(message
// //       `The highest probability prediction is ${result.className}
// //        with a probability of ${(result.probability * 100).toFixed(2)}%`
// //     );

// // })
      
// //   });
  
    
// //   export{
// //     addPhoto
//  // }




//  const classifier = new ImageClassifier();

//  // Define the addPhoto function to handle photo upload and classification
//  const addPhoto = catchError(async (req, res, next) => {
//      try {
//          // Upload image to Cloudinary
//          cloudinary.uploader.upload(req.file.path, async (error, result) => {
//              if (error) {
//                  // Handle Cloudinary upload error
//                  return next(error);
//              }
//              req.body.image = result.secure_url;
 
//              try {
//                  // Classify the uploaded image
//                  const classificationResult = await classifier.classifyImage(req.body.image);
//                  // Send JSON response with classification result
//                  res.json({
//                      message: `The highest probability prediction is ${classificationResult.className} with a probability of ${(classificationResult.probability * 100).toFixed(2)}%`
//                  });
//              } catch (classificationError) {
//                  // Handle classification error
//                  return next(classificationError);
//              }
//          });
//      } catch (uploadError) {
//          // Handle any other error that might occur during the process
//          return next(uploadError);
//      }
//  });
 
//  export { addPhoto };
  




const addPhoto = async (req, res, next) => {
  try {
     
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      req.body.image = uploadResult.secure_url;

      
      const classifier = new ImageClassifier();
      const classificationResult = await classifier.classifyImage(req.body.image);

      
      res.json({
          message:`${classificationResult.className}`
      });
  } catch (error) {
      
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
  }
};

export {
  addPhoto
};



//message: `The highest probability prediction is ${classificationResult.className} with a probability of ${(classificationResult.probability * 100).toFixed(2)}%`