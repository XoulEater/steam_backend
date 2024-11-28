"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlistController_1 = __importDefault(require("../controllers/wishlistController"));
const router = (0, express_1.Router)();
const wishlistController = new wishlistController_1.default();
router.post("/:wid/add/:gid", wishlistController.addToWishlist);
router.post("/:wid/remove/:gid", wishlistController.removeFromWishlist);
router.get("/:id", wishlistController.getWishlistByUserId);
exports.default = router;
//# sourceMappingURL=wishlist.js.map