import Router from "express";
import { allowedTo } from "../../middleware/authorization.js";
import { protectRoutes } from "../../middleware/authentication.js";
import {
  createCashOrder,
  deleteOrderById,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "./order.controller.js";
import { validation } from "../../middleware/validation.js";
import * as validator from "./order.validation.js";

const OrderRouter = Router();

OrderRouter.post(
  "/createCashOrder/:cartId",
  protectRoutes,
  allowedTo("Admin", "User"),
  validation(validator.createCashOrderSchema),
  createCashOrder
);

OrderRouter.get(
  "/getAllOrders",
  protectRoutes,
  allowedTo("Admin", "User"),
  getAllOrders
);

OrderRouter.get(
  "/getOrderById/:orderId",
  protectRoutes,
  allowedTo("Admin", "User"),
  validation(validator.getOrderByIdSchema),
  getOrderById
);

OrderRouter.delete(
  "/deleteOrderById/:orderId",
  protectRoutes,
  allowedTo("Admin", "User"),
  validation(validator.deleteOrderByIdSchema),
  deleteOrderById
);

OrderRouter.get(
  "/getMyOrders/:userId",
  protectRoutes,
  allowedTo("Admin", "User"),
  validation(validator.getMyOrdersSchema),
  getMyOrders
);

OrderRouter.put(
  "/updateOrderToPaid/:orderId",
  protectRoutes,
  allowedTo("Admin", "User"),
  validation(validator.updateOrderToPaidSchema),
  updateOrderToPaid
);
OrderRouter.put(
  "/updateOrderToDelivered/:orderId",
  protectRoutes,
  allowedTo("Admin", "User"),
  validation(validator.updateOrderToDeliveredSchema),
  updateOrderToDelivered
);

export default OrderRouter;