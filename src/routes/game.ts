import { Router } from "express";

import GameController from "../controllers/gameController";

const router = Router();
const gameController = new GameController();

router.get("/", gameController.getAllGames);
router.get("/filter", gameController.filterGames);
router.get("/search", gameController.searchGames);
router.get("/discounts", gameController.getGamesWithDiscounts);
router.get("/popular", gameController.getMostPopularGames);
router.get("/categories", gameController.getAllCategories);
router.get("/developers", gameController.getAllDevelopers);
router.get("/:id", gameController.getGameById);
router.get("/:id/related", gameController.getRelatedGames);
router.post("/", gameController.createGame);
router.post("/:id/review", gameController.addReview);
router.post("/:id/discount", gameController.addDiscount);
router.delete("/:id/discount", gameController.removeDiscount);
router.post(
    "/category/:category/discount",
    gameController.addDiscountToCategory
);
router.put("/:id", gameController.updateGame);
router.delete("/:id", gameController.deleteGame);

export default router;
