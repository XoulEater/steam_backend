"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controllers/orderController"));
const router = (0, express_1.Router)();
const orderController = new orderController_1.default();
router.post("/orders/:id", orderController.createOrder);
router.get("/orders/user/:id", orderController.getOrdersByUserId);
router.get("/orders", orderController.getAllOrders);
router.put("/orders/:id/status", orderController.modifyOrderStatus);
exports.default = router;
//# sourceMappingURL=orders.js.map