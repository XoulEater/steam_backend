import { Router } from "express";
import WishlistController from "../controllers/wishlistController";

const router = Router();
const wishlistController = new WishlistController();

router.post("/:id/add", wishlistController.addToWishlist);
router.post("/:id/remove", wishlistController.removeFromWishlist);
router.get("/:id", wishlistController.getWishlistByUserId);

export default router;
