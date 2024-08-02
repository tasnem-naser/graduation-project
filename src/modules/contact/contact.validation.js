import Joi from "joi";


const addcontactval = Joi.object({
    
    Name: Joi.string().min(2).max(100).required().trim(),
    email: Joi.string().pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/),
    message:Joi.string().min(30).max(1500).trim(),

})

export{
    addcontactval
}