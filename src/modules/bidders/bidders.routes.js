import express from "express"
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";
import { validation } from "../../middleware/validation.js";
import { addBidderval } from "./bidders.validation.js";
import { addBidders } from "./bidders.controller.js";

const biddeeRouter = express.Router();


biddeeRouter
.route('/')
.post(protectRoutes,allowedTo('User'),validation(addBidderval),addBidders)













export default biddeeRouter