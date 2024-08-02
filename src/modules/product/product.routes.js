import  express  from "express";

import { addproductval, paramsproductval, updateproductval } from "./product.validation.js";
import { addproduct, deleteproduct, getallproducts, getsingleproduct, updateProduct } from "./product.controller.js";
import { validation } from "../../middleware/validation.js";
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";
import { uploadfields } from "../../services/uploadfile/uploadfiles.js";







const  productRouter  = express.Router()

 productRouter 
.route('/')
.post( protectRoutes,allowedTo('User','Admin'),uploadfields([
    {name:'imgCover',maxCount:1},
    {name:'images',maxCount:10}
]),validation(addproductval),addproduct)
.get(getallproducts)


 productRouter 
.route('/:id')
.get(protectRoutes,allowedTo('User','Admin'),validation(paramsproductval),getsingleproduct)
.put( uploadfields([
    {name:'imgCover',maxCount:1},
    {name:'images',maxCount:10}

]),validation(updateproductval),updateProduct)
.delete(protectRoutes,allowedTo('User','Admin'),validation(paramsproductval),deleteproduct)

export default  productRouter 