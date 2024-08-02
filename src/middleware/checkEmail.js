import { UserModel } from "../../databases/models/user.model.js"
import { catchError } from "./catchError.js"



export const checkEmail = catchError(async (req, res,next) => {
    let user = await UserModel.findOne({ email: req.body.email })
    if (user) return res.json({ message: 'Email already exists.' })
    next()
})