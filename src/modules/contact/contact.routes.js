import express from "express" 
import { validation } from "../../middleware/validation.js"
import { protectRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"
import { addcontactval } from "./contact.validation.js"
import { addcontact, getcontact } from "./contact.controller.js"






const contactRouter = express.Router()

contactRouter
.route('/')
.post(protectRoutes,allowedTo('User','Admin'),validation(addcontactval),addcontact)
.get(protectRoutes,allowedTo('User','Admin'),getcontact)



export default contactRouter