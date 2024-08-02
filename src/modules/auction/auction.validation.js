import Joi from "joi";

const addauctionval = Joi.object({

    ProductId :Joi.string().hex().length(24).required(),
    UserId:Joi.string().hex().length(24).required(),
    fristPrice:Joi.number().required(),
    highestPrice:Joi.number().required(),
        

})




const updateauctionval = Joi.object({
    productId:Joi.string().hex().length(24).required(),
    ProductId :Joi.string().hex().length(24),
    UserId:Joi.string().hex().length(24),
    fristPrice:Joi.number(),
    highestPrice:Joi.number(),
    newPrice:Joi.number()
        

})



const paramval =Joi.object({
    productId: Joi.string().hex().length(24).required(),
})









export {
    addauctionval,
    updateauctionval,
    paramval
}



