import { Router } from "express";
import WishlistController from "../controllers/wishlistController";

const router = Router();
const wishlistController = new WishlistController();

router.post("/:wid/add/:gid", wishlistController.addToWishlist);
router.post("/:wid/remove/:gid", wishlistController.removeFromWishlist);
router.get("/:id", wishlistController.getWishlistByUserId);

export default router;
