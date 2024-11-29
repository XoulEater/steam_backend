"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gameController_1 = __importDefault(require("../controllers/gameController"));
const router = (0, express_1.Router)();
const gameController = new gameController_1.default();
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
router.post("/category/:category/discount", gameController.addDiscountToCategory);
router.put("/:id", gameController.updateGame);
router.delete("/:id", gameController.deleteGame);
exports.default = router;
//# sourceMappingURL=game.js.map