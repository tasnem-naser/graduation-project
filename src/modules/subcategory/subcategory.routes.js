import express from "express"
import { validation } from "../../middleware/validation.js"
import { addsubcategoryval, paramsval, updatesubcategoryval } from "./subcategory.validation.js"
import { addsubcategory, deletesubcategory, getallsubcategories, getsinglesubcategory, updatesubcategory } from "./subcategory.controller.js"
import { protectRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"

const subcategoryRouter =express.Router({mergeParams: true})

subcategoryRouter
.route('/')
.post(protectRoutes,allowedTo('User','Admin'),validation(addsubcategoryval),addsubcategory)
.get(getallsubcategories)


subcategoryRouter
.route('/:id')
.get(protectRoutes,allowedTo('User','Admin'),validation(paramsval),getsinglesubcategory)
.put(protectRoutes,allowedTo('Admin'),validation(updatesubcategoryval),updatesubcategory)
.delete(protectRoutes,allowedTo('Admin'),validation(paramsval),deletesubcategory)



export default subcategoryRouter