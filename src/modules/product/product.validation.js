import Joi from "joi";

const addproductval = Joi.object({
    
    name: Joi.string().min(2).trim(),
    description: Joi.string().min(50).max(1500).trim(),
    price: Joi.number().min(0),
    quality:Joi.string().valid('Used like new','Used good','Used fair').required(),
    category:Joi.string().hex().length(24).required(),
    subcategory:Joi.string().hex().length(24).required(),
    createdBy:Joi.string().hex().length(24).optional(),




    images:Joi.array().items(Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required() ,
        encoding:Joi.string().required(), 
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
       destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),

        })).required(),

           imgCover:Joi.array().items(Joi.object({
            fieldname:Joi.string().required(),
            originalname:Joi.string().required() ,
            encoding:Joi.string().required(), 
            mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
            size:Joi.number().max(5242880).required(),
           destination:Joi.string().required(),
            filename:Joi.string().required(),
            path:Joi.string().required(),
    
            })).required()

})

const paramsproductval = Joi.object({
    
    id:Joi.string().hex().length(24).required(),
})


const updateproductval = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(2).trim(),
    description: Joi.string().min(50).max(1500).trim(),
    price: Joi.number().min(0),
    quality:Joi.string(),
    category:Joi.string().hex().length(24),
    subcategory:Joi.string().hex().length(24),
    createdBy:Joi.string().hex().length(24).optional(),
    images:Joi.array().items(Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required() ,
        encoding:Joi.string().required(), 
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
       destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),

        })),

           imgCover:Joi.array().items(Joi.object({
            fieldname:Joi.string().required(),
            originalname:Joi.string().required() ,
            encoding:Joi.string().required(), 
            mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
            size:Joi.number().max(5242880).required(),
           destination:Joi.string().required(),
            filename:Joi.string().required(),
            path:Joi.string().required(),
    
            }))

})
export{
    addproductval,
    paramsproductval,
    updateproductval

}