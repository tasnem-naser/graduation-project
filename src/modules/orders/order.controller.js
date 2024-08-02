import asyncHandler from "express-async-handler";
import { productmodel } from "../../../databases/models/product.model.js";
import { cartModel } from "../../../databases/models/cart.model.js";
import { orderModel } from "../../../databases/models/order.model.js";

//@desc create cash order
//@route POST /api/v1/orders/:cartId
//@access protected/user
export const createCashOrder = asyncHandler(async (req, res, next) => {
  const { cartId } = req.params;
  const { shippingAddress } = req.body;
  //app settings
  const taxPrice = 0;
  const shippingPrice = 0;
  //1) get cart depend on cartId
  const cart = await  cartModel.findById(cartId);
  if (!cart) {
    res.status(404).json({ message:`there is no cart with id ${req.params.cartId}` });
  }
  //2) get order price cart price  "check if copoun applied"
  const cartPrice = cart.totalCartpriceAfterDiscount
    ? cart.totalCartpriceAfterDiscount
    : cart.totalCartprice;
  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
  //3)create order with default payment method cash
  const order = await orderModel.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress,
    totalOrderPrice,
  });
  if (!order) {
    res.status(400).json({ message: "Order not created" });
  }
  //4) after creating order  decerement product quantity and increment product sold
  const bulkOptions = cart.cartItems.map((item) => ({
    updateOne: {
      filter: { _id: item.product },
      update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
    },
  }));
  await productmodel.bulkWrite(bulkOptions, {});
  //5)clear cart depend on cartId
  //await  cartModel.findByIdAndDelete(cartId);
cart.cartItems=[];
cart.totalCartprice=0;
cart.totalCartpriceAfterDiscount=0;
await cart.save();
  res.status(201).json({ status: "success", data: order });
});

//get all order
//@route GET /api/v1/orders
//@access protected/admin
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await orderModel.find().populate("cartItems");
  res.status(200).json({ status: "success", data: orders });
});
//get order by id
//@route GET /api/v1/orders/:orderId
//@access protected/user
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await orderModel.findById(req.params.orderId);
  // .populate(
  //   "cartItems.product"
  // );
  if (!order) {
    res.status(404).json({ message: "Order not found" });
  }
  res.status(200).json({ status: "success", data: order });
});
//delete order by id
//@route DELETE /api/v1/orders/:orderId
//@access protected/user
export const deleteOrderById = asyncHandler(async (req, res, next) => {
  const order = await orderModel.findByIdAndDelete(req.params.orderId);
  if (!order) {
    res.status(404).json({ message: "Order not found" });
  }
  res
    .status(200)
    .json({ status: "success", message: "Order deleted", data: order });
});
//get user odrders
//@route GET /api/v1/orders/myorders/:userId
//@access protected/user
export const getMyOrders = asyncHandler(async (req, res, next) => {
  const user = req.params.userId;
  const orders = await orderModel.find({ user });
  res.status(200).json({ status: "success", data: orders });
});
//update order to paid
//@route PUT /api/v1/orders/:orderId/pay
//@access protected/admin
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await orderModel.findById(req.params.orderId);
  if (!order) {
    res.status(404).json({ message: "Order not found" });
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  const updatedOrder = await order.save();
  res.status(200).json({ status: "success", data: updatedOrder });
});
//update order to delivered
//@route PUT /api/v1/orders/:orderId/deliver
//@access protected/admin
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await orderModel.findById(req.params.orderId);
  if (!order) {
    res.status(404).json({ message: "Order not found" });
  }
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updatedOrder = await order.save();
  res.status(200).json({ status: "success", data: updatedOrder });
});