import Joi from "joi";

const addcategoryval = Joi.object({
    
     
    name:Joi.string().min(2).max(100).required().trim(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required() ,
        encoding:Joi.string().required(), 
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        

        })

        
   
})

const paramsval = Joi.object({
    
    id:Joi.string().hex().length(24).required()

})

const updatecategoryval = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(2).max(100),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required() ,
        encoding:Joi.string().required(), 
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
       destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),

        })
 
})

export{
    addcategoryval,
    paramsval,
    updatecategoryval,
}
