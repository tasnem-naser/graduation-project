import { technicalModel } from "../../../databases/models/technical.model.js"
import { catchError } from "../../middleware/catchError.js"

const submit = catchError(async(req, res,next) => {
    let technical = await technicalModel(req.body)
    technical .save()
    !technical &&res.status(403).json({message:'report not founded'})
    technical &&res.json({message:"report is done",technical })
  })
  


  export{
    submit
  }