import { Router } from "express";
import CartController from "../controllers/cartController";

const router = Router();
const cartController = new CartController();

router.post("/:cid/add/:gid", cartController.addToCart);
router.post("/:cid/remove/:gid", cartController.removeFromCart);
router.get("/:id", cartController.getCart);
router.put("/:id", cartController.updateCart);

export default router;
