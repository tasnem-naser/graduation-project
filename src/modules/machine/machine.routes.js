import express from "express";
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";
import { addPhoto } from "./machine.controller.js";
import {  uploadsinglefile } from "../../services/uploadfile/uploadfiles.js";




const photoRouter = express.Router()

photoRouter.route("/addPhoto").post(protectRoutes,allowedTo("User","Admin"),uploadsinglefile("image"),addPhoto)





export default photoRouter