"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../models/Game");
const StockAlert_1 = require("../models/StockAlert");
class GameController {
    /**
     * Get all games with pagination
     * @param req page and limit query parameters
     * @param res all games with pagination
     */
    getAllGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const skip = (page - 1) * limit;
                const allGames = yield Game_1.GameModel.find().skip(skip).limit(limit);
                const totalGames = yield Game_1.GameModel.countDocuments();
                res.status(200).json({
                    games: allGames,
                    totalPages: Math.ceil(totalGames / limit),
                    currentPage: page,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Get a game by its ID
     * @param req game ID
     * @param res game
     */
    getGameById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield Game_1.GameModel.findById(req.params.id);
                if (game) {
                    res.status(200).json(game);
                }
                else {
                    res.status(404).json({ message: "Game not found" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Get games with discounts
     * @param req none
     * @param res games with discounts
     */
    getGamesWithDiscounts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield Game_1.GameModel.find({
                    "discount.type": { $ne: "none" },
                }).limit(12);
                res.status(200).json(games);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Get most popular games
     * @param req none
     * @param res most popular games
     */
    getMostPopularGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield Game_1.GameModel.find()
                    .sort({ popularity: -1 })
                    .limit(6);
                res.status(200).json(games);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Get all categories
     * @param req none
     * @param res all categories
     */
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield Game_1.GameModel.distinct("categories");
                res.status(200).json(categories);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Get all developers
     * @param req none
     * @param res all developers
     */
    getAllDevelopers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const developers = yield Game_1.GameModel.distinct("developer");
                res.status(200).json(developers);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Create a new game
     * @param req game data
     * @param res new game id
     */
    createGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const game = yield Game_1.GameModel.create(req.body);
                res.status(201).json({ game: game.id });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Update a game by its ID
     * @param req game ID and new data
     * @param res success message
     */
    updateGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body, req.params);
                yield Game_1.GameModel.updateOne({ _id: req.params.id }, req.body);
                res.status(200).json({ message: "Game updated successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Delete a game by its ID
     * @param req game ID
     * @param res success message
     */
    deleteGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Game_1.GameModel.deleteOne({ _id: req.params.id });
                res.status(200).json({ message: "Game deleted successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Add a review to a game
     * @param req game ID and review data
     * @param res success message
     */
    addReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body, req.params.id);
                const game = yield Game_1.GameModel.updateOne({ _id: req.params.id }, { $push: { reviews: req.body } });
                console.log(game);
                res.status(200).json({ message: "Review added successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Add a discount to a game
     * @param req game ID and review ID
     * @param res success message
     */
    addDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Game_1.GameModel.updateOne({ _id: req.params.id }, { discount: req.body.discount });
                res.status(200).json({ message: "Discount added successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Add a discount to all the games of a category
     * @param req category and discount data
     * @param res success message
     */
    addDiscountToCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO: Use new Category model
                yield Game_1.GameModel.updateMany({ categories: { $in: [req.params.category] } }, { discount: req.body.discount });
                res.status(200).json({ message: "Discount added successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Remove a discount from a game
     * @param req game ID
     * @param res success message
     */
    removeDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Game_1.GameModel.updateOne({ _id: req.params.id }, { discount: { type: "none" } });
                res.status(200).json({ message: "Discount removed successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Filter games by category, developer, price, and popularity with pagination
     * @param req query
     * @param res filtered games
     */
    filterGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = {};
                console.log(req.query);
                const categories = typeof req.query.categories === "string"
                    ? req.query.categories.split(",")
                    : [];
                if (req.query.categories) {
                    filters.categories = { $in: categories };
                }
                if (req.query.developer) {
                    filters.developer = req.query.developer;
                }
                if (req.query.price) {
                    filters.price = { $lte: req.query.price };
                }
                if (req.query.popularity) {
                    filters.popularity = req.query.popularity;
                }
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const skip = (page - 1) * limit;
                const games = yield Game_1.GameModel.find(filters).skip(skip).limit(limit);
                const totalGames = yield Game_1.GameModel.countDocuments(filters);
                res.status(200).json({
                    games: games,
                    totalPages: Math.ceil(totalGames / limit),
                    currentPage: page,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Search games with a keyword with suggestions
     * @param req query
     * @param res games
     */
    searchGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield Game_1.GameModel.find({
                    $or: [
                        {
                            title: {
                                $regex: req.query.keyword,
                                $options: "i",
                            },
                        },
                        {
                            developer: {
                                $regex: req.query.keyword,
                                $options: "i",
                            },
                        },
                    ],
                }).limit(5);
                res.status(200).json(games);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    /**
     * Get related games by category and developer
     * @param req game ID
     * @param res related games
     */
    getRelatedGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield Game_1.GameModel.findById(req.params.id);
                if (!game) {
                    res.status(404).json({ message: "Game not found" });
                    return;
                }
                const relatedGames = yield Game_1.GameModel.find({
                    $or: [{ categories: { $in: game.categories } }],
                }).limit(3);
                res.status(200).json(relatedGames);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    // Populate the database with some games
    populateGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement this method
        });
    }
    /**
     * Update stock of a game
     * @param req game ID and new stock
     * @param res success message
     */
    updateStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = req.body.sales;
                const game = yield Game_1.GameModel.findOneAndUpdate({ _id: req.params.id }, { $inc: { stock: -sales, sales: sales } }, { new: true });
                if (!game) {
                    res.status(404).json({ message: "Game not found" });
                    return;
                }
                if (game.stock <= 5) {
                    yield StockAlert_1.StockAlertModel.create({
                        game: game === null || game === void 0 ? void 0 : game.title,
                        stock: req.body.stock,
                    });
                }
                res.status(200).json({ message: "Stock updated successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
}
exports.default = GameController;
//# sourceMappingURL=gameController.js.map