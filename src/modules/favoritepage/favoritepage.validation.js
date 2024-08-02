import Joi from "joi"


const addfavoritepageval = Joi.object({
    product:Joi.string().hex().length(24).required()


})


const paramsval = Joi.object({
    
    id:Joi.string().hex().length(24).required(),
})





export{
    addfavoritepageval,
    paramsval 
}