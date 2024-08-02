import Joi from "joi"

const addval =Joi.object({
    orderName:Joi.string().required(),
    opinion:Joi.string().required(),
    price:Joi.number().required(),
    reason:Joi.string().required()
})

export{
    addval
}