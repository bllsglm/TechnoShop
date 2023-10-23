import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderToDelivered, 
  updateOrderToPaid,
  getOrderById} from "../controllers/orderController.js"

  import { protect, admin } from '../middleware/authMiddleware.js';

  router.route("/").get(protect, admin, getOrders).post(protect, addOrderItems);
  router.route("/mine").get(protect,getMyOrders); 
  router.route("/:id").get(protect,admin,getOrderById);
  router.route("/:id/pay").put(protect, updateOrderToPaid)
  router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered)

  export default router