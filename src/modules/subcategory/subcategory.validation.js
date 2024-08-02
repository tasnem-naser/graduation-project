import Joi from "joi";

const addsubcategoryval = Joi.object({
    
    name: Joi.string().min(2).max(100).required().trim(),
    category:Joi.string().hex().length(24).required()

})

const paramsval = Joi.object({
    
    id:Joi.string().hex().length(24).required(),

})

const updatesubcategoryval = Joi.object({
    
    name: Joi.string().min(2).max(100).required().trim(),
    id: Joi.string().hex().length(24).required(),
 
})

export{
    addsubcategoryval,
    paramsval,
    updatesubcategoryval,
}

