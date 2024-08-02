import Joi from "joi";
import { Types } from "mongoose";

const objectIdValidation = (value, helper) => {
  const isValid = Types.ObjectId.isValid(value);
  return isValid ? value : helper.message("invalid objectId");
};

export const createCashOrderSchema = Joi.object({
  shippingAddress: Joi.object({
    details: Joi.string().required().min(3),
    phone: Joi.string().required().min(3),
    city: Joi.string().required().min(3),
    postalCode: Joi.string().required().min(3),
  }),
  cartId: Joi.string().required().custom(objectIdValidation),
});

export const getOrderByIdSchema = Joi.object({
  orderId: Joi.string().required().custom(objectIdValidation),
});

export const deleteOrderByIdSchema = Joi.object({
  orderId: Joi.string().required().custom(objectIdValidation),
});

export const getMyOrdersSchema = Joi.object({
  userId: Joi.string().required().custom(objectIdValidation),
});

export const updateOrderToPaidSchema = Joi.object({
  orderId: Joi.string().required().custom(objectIdValidation),
});
export const updateOrderToDeliveredSchema = Joi.object({
  orderId: Joi.string().required().custom(objectIdValidation),
});