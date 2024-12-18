"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controllers/orderController"));
const router = (0, express_1.Router)();
const orderController = new orderController_1.default();
router.post("/:id", orderController.createOrder);
router.get("/user/:id", orderController.getOrdersByUserId);
router.get("/", orderController.getAllOrders);
router.put("/:id/status", orderController.modifyOrderStatus);
exports.default = router;
//# sourceMappingURL=orders.js.map