import { Game } from "./../models/Game";
import { GameModel } from "../models/Game";
import { Request, Response } from "express";
import { Discount } from "./../models/Discount";

class GameController {
    /**
     * Get all games with pagination
     * @param req page and limit query parameters
     * @param res all games with pagination
     */
    public async getAllGames(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;

            const allGames = await GameModel.find().skip(skip).limit(limit);
            const totalGames = await GameModel.countDocuments();

            res.status(200).json({
                games: allGames,
                totalPages: Math.ceil(totalGames / limit),
                currentPage: page,
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Get a game by its ID
     * @param req game ID
     * @param res game
     */
    public async getGameById(req: Request, res: Response): Promise<void> {
        try {
            const game = await GameModel.findById(req.params.id);

            if (game) {
                res.status(200).json(game);
            } else {
                res.status(404).json({ message: "Game not found" });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Get games with discounts
     * @param req none
     * @param res games with discounts
     */
    public async getGamesWithDiscounts(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const games = await GameModel.find({
                "discount.type": { $ne: "none" },
            }).limit(12);

            res.status(200).json(games);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Get most popular games
     * @param req none
     * @param res most popular games
     */
    public async getMostPopularGames(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const games = await GameModel.find()
                .sort({ popularity: -1 })
                .limit(6);

            res.status(200).json(games);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Get all categories
     * @param req none
     * @param res all categories
     */
    public async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await GameModel.distinct("categories");

            res.status(200).json(categories);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Get all developers
     * @param req none
     * @param res all developers
     */
    public async getAllDevelopers(req: Request, res: Response): Promise<void> {
        try {
            const developers = await GameModel.distinct("developer");

            res.status(200).json(developers);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Create a new game
     * @param req game data
     * @param res new game id
     */
    public async createGame(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body);
            const game = await GameModel.create(req.body);

            res.status(201).json({ game: game.id });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Update a game by its ID
     * @param req game ID and new data
     * @param res success message
     */
    public async updateGame(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body, req.params);
            await GameModel.updateOne({ _id: req.params.id }, req.body);

            res.status(200).json({ message: "Game updated successfully" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Delete a game by its ID
     * @param req game ID
     * @param res success message
     */
    public async deleteGame(req: Request, res: Response): Promise<void> {
        try {
            await GameModel.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Game deleted successfully" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Add a review to a game
     * @param req game ID and review data
     * @param res success message
     */
    public async addReview(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body, req.params.id);
            const game = await GameModel.updateOne(
                { _id: req.params.id },
                { $push: { reviews: req.body } }
            );

            console.log(game);

            res.status(200).json({ message: "Review added successfully" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Add a discount to a game
     * @param req game ID and review ID
     * @param res success message
     */
    public async addDiscount(req: Request, res: Response): Promise<void> {
        try {
            await GameModel.updateOne(
                { _id: req.params.id },
                { discount: req.body.discount }
            );

            res.status(200).json({ message: "Discount added successfully" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Add a discount to all the games of a category
     * @param req category and discount data
     * @param res success message
     */
    public async addDiscountToCategory(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            await GameModel.updateMany(
                { categories: { $in: [req.params.category] } },
                { discount: req.body.discount }
            );

            res.status(200).json({ message: "Discount added successfully" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Remove a discount from a game
     * @param req game ID
     * @param res success message
     */
    public async removeDiscount(req: Request, res: Response): Promise<void> {
        try {
            await GameModel.updateOne(
                { _id: req.params.id },
                { discount: { type: "none" } }
            );

            res.status(200).json({ message: "Discount removed successfully" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Filter games by category, developer, price, and popularity with pagination
     * @param req query
     * @param res filtered games
     */
    public async filterGames(req: Request, res: Response): Promise<void> {
        try {
            const filters: any = {};

            console.log(req.query);

            const categories =
                typeof req.query.categories === "string"
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

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;

            const games = await GameModel.find(filters).skip(skip).limit(limit);
            const totalGames = await GameModel.countDocuments(filters);

            res.status(200).json({
                games: games,
                totalPages: Math.ceil(totalGames / limit),
                currentPage: page,
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Search games with a keyword with suggestions
     * @param req query
     * @param res games
     */
    public async searchGames(req: Request, res: Response): Promise<void> {
        try {
            const games = await GameModel.find({
                $or: [
                    {
                        title: {
                            $regex: req.query.keyword as string,
                            $options: "i",
                        },
                    },
                    {
                        developer: {
                            $regex: req.query.keyword as string,
                            $options: "i",
                        },
                    },
                ],
            }).limit(5);

            res.status(200).json(games);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Get related games by category and developer
     * @param req game ID
     * @param res related games
     */
    public async getRelatedGames(req: Request, res: Response): Promise<void> {
        try {
            const game = await GameModel.findById(req.params.id);

            if (!game) {
                res.status(404).json({ message: "Game not found" });
                return;
            }

            const relatedGames = await GameModel.find({
                $or: [{ categories: { $in: game.categories } }],
            }).limit(3);

            res.status(200).json(relatedGames);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    // Populate the database with some games
    public async populateGames(req: Request, res: Response): Promise<void> {
        // TODO: Implement this method
    }
}

export default GameController;
