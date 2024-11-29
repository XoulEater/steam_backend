import { Router } from "express";
import OrderController from "../controllers/orderController";

const router = Router();
const orderController = new OrderController();

router.post("/:id", orderController.createOrder);
router.get("/user/:id", orderController.getOrdersByUserId);
router.get("/", orderController.getAllOrders);
router.put("/:id/status", orderController.modifyOrderStatus);

export default router;
