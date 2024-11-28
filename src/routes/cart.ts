import { Router } from "express";
import CartController from "../controllers/cartController";

const router = Router();
const cartController = new CartController();

router.post("/:id/add", cartController.addToCart);
router.post("/:id/remove", cartController.removeFromCart);
router.get("/:id", cartController.getCart);
router.put("/:id", cartController.updateCart);

export default router;
