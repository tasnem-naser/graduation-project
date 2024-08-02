import { AppError } from "../utils/AppError.js"


export const validation= (schema) => {
    return (req, res, next) => {
        let filter ={}
        if(req.file){
            filter={image:req.file, ...req.body,...req.params,...req.query}
        }
        else if(req.files){
            filter={...req.files, ...req.body,...req.params,...req.query}
        }
        else{
            filter={...req.body,...req.params,...req.query}
        }
        const { error } = schema.validate(filter, { abortEarly: false })
        if (!error) {
            next()
        } else {
            let errMsg = []
            error.details.forEach((val)=>{
                errMsg.push(val.message)
            })
            next(new AppError(errMsg,401))
           
        }
    }
}
