import Joi from "joi";
import { Types } from "mongoose";

const objectIdValidation = (value, helper) => {
  const isValid = Types.ObjectId.isValid(value);
  return isValid ? value : helper.message("invalid objectId");
};

export const addProductToCartSchema = Joi.object({
  
  productId: Joi.string().required().custom(objectIdValidation),
  quantity: Joi.number().greater(0).optional(),
  
});
export const updateProductQuantitySchema = Joi.object({
  
  productId: Joi.string().required().custom(objectIdValidation),
 // cartId: Joi.string().optional().custom(objectIdValidation),
  quantity: Joi.number().greater(0).required(),
});
export const getLoggedUserCartSchema = Joi.object({
  _id: Joi.string().required().custom(objectIdValidation),
});