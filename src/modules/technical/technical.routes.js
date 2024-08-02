import express from "express"
import { validation } from "../../middleware/validation.js"
import { addval } from "./technical.validation.js"
import { submit } from "./technical.controller.js"
import { protectRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"

const technicalRouter =  express.Router()



technicalRouter.post('/submit',protectRoutes,allowedTo('User','Admin'),validation(addval),submit)








export default technicalRouter





