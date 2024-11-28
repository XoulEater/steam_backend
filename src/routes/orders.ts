import { Router } from "express";
import OrderController from "../controllers/orderController";

const router = Router();
const orderController = new OrderController();

router.post("/orders/:id", orderController.createOrder);
router.get("/orders/user/:id", orderController.getOrdersByUserId);
router.get("/orders", orderController.getAllOrders);
router.put("/orders/:id/status", orderController.modifyOrderStatus);

export default router;
