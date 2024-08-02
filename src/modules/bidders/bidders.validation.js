import Joi from "joi";

const addBidderval = Joi.object({

    productId :Joi.string().hex().length(24).required(),
    offerPrice:Joi.number().required(),
        

})

export {
    addBidderval
}