import { GameModel } from "../models/Game";
import { WishlistModel } from "./../models/Wishlist";
import { Request, Response } from "express";

class WishlistController {
    /**
     * Add to wishlist
     * @param req
     * @param res
     */
    public async addToWishlist(req: any, res: any): Promise<void> {
        try {
            const game = await GameModel.findById(req.params.gid);

            if (!game) {
                res.status(404).json({ message: "Game not found" });
                return;
            }

            const wishlist = await WishlistModel.findOne({
                userId: req.params.wid,
            });

            if (!wishlist) {
                await WishlistModel.create({
                    userId: req.params.wid,
                    games: [game],
                });
            } else {
                wishlist.games.push(game);
                await wishlist.save();
            }

            res.status(201).json({ message: "Game added to wishlist" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Remove from wishlist
     * @param req
     * @param res
     */
    public async removeFromWishlist(req: any, res: any): Promise<void> {
        try {
            const gameID = req.params.gid;

            const wishlist = await WishlistModel.findOne({
                userId: req.params.wid,
            });

            if (!wishlist) {
                res.status(404).json({ message: "Wishlist not found" });
                return;
            }

            const gameIndex = wishlist.games.findIndex(
                (game) => game._id.toString() === gameID
            );

            if (gameIndex === -1) {
                res.status(404).json({ message: "Game not found" });
                return;
            }

            wishlist.games.splice(gameIndex, 1);
            await wishlist.save();
            res.status(200).json({ message: "Game removed from wishlist" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Get wishlist by user id
     * @param req
     * @param res
     */
    public async getWishlistByUserId(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const wishlist = await WishlistModel.findOne({
                userId: req.params.id,
            });
            res.status(200).json(wishlist?.games);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }
}

export default WishlistController;
