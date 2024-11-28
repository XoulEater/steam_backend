"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = __importDefault(require("../controllers/cartController"));
const router = (0, express_1.Router)();
const cartController = new cartController_1.default();
router.post("/:cid/add/:gid", cartController.addToCart);
router.post("/:cid/remove/:gid", cartController.removeFromCart);
router.get("/:id", cartController.getCart);
router.put("/:id", cartController.updateCart);
exports.default = router;
//# sourceMappingURL=cart.js.map