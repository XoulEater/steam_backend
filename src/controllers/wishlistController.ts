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
            const { game } = req.body;

            const wishlist = await WishlistModel.findOne({
                userId: req.params.id,
            });

            if (!wishlist) {
                await WishlistModel.create({
                    userId: req.params.id,
                    games: [game],
                });
            } else {
                wishlist.games.push(game);
                await wishlist.save();
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
     * Remove from wishlist
     * @param req
     * @param res
     */
    public async removeFromWishlist(req: any, res: any): Promise<void> {
        try {
            const { game } = req.body;

            const wishlist = await WishlistModel.findOne({
                userId: req.params.id,
            });

            if (!wishlist) {
                res.status(404).json({ message: "Wishlist not found" });
                return;
            }

            wishlist.games = wishlist.games.filter(
                (g) => g._id.toString() !== game._id
            );

            await wishlist.save();
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
            res.status(200).json(wishlist);
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
