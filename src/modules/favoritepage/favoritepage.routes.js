import express from "express"
import { validation } from "../../middleware/validation.js"
import { addfavoritepageval, paramsval } from "./favoritepage.validation.js"
import { addfavoritepage, getuserfavoritepage, removefavoritepage } from "./favoritepage.controller.js"
import { protectRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"



const favoritepageRouter = express.Router()


favoritepageRouter
.route('/')
.patch(protectRoutes,validation(addfavoritepageval),allowedTo("User","Admin"),addfavoritepage)
.get(protectRoutes,allowedTo("User","Admin"),getuserfavoritepage)





favoritepageRouter
.route('/:id')
.delete(protectRoutes,allowedTo("User","Admin"),validation(paramsval),removefavoritepage)






export default favoritepageRouter 