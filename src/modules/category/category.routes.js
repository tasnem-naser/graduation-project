import express from "express" 

import subcategoryRouter from "../subcategory/subcategory.routes.js"
import { validation } from "../../middleware/validation.js"
import { addcategoryval, paramsval, updatecategoryval } from "./category.validation.js"
import { addcategory, deletecategory,getallcategories,getsinglecategory, updatecategory } from "./category.controller.js"
import { protectRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"
import { uploadsinglefile } from "../../services/uploadfile/uploadfiles.js"






const categoryRouter = express.Router()

categoryRouter.use('/:category/subcategories',subcategoryRouter)

categoryRouter
.route('/')
.post(protectRoutes,allowedTo('User','Admin'),uploadsinglefile('image'),validation(addcategoryval),addcategory)
.get(getallcategories)

categoryRouter
.route('/:id')
.get(protectRoutes,allowedTo('User','Admin'),validation(paramsval),getsinglecategory)
.put(protectRoutes,allowedTo('User','Admin'),uploadsinglefile('image'),validation(updatecategoryval),updatecategory)
.delete(protectRoutes,allowedTo('User','Admin'),validation(paramsval),deletecategory)

export default categoryRouter