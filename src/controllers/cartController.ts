import { GameModel } from "../models/Game";
import { CartModel } from "./../models/Cart";
import { Request, Response } from "express";

class CartController {
    /***
     * Add to cart
     * @param req
     * @param res
     */
    public async addToCart(req: any, res: any): Promise<void> {
        try {
            const game = await GameModel.findById(req.params.gid);

            if (!game) {
                res.status(404).json({ message: "Game not found" });
                return;
            }
            const cart = await CartModel.findOne({ userId: req.params.id });

            let discount = 0;
            if (game.discount.type != "none") {
                discount = game.price;
                game.discount.type === "percentage"
                    ? (discount -= game.price * game.discount.value)
                    : (discount -= game.discount.value);
            }

            // if game in cart already, increase quantity
            if (cart && cart.games.length > 0) {
                const gameIndex = cart.games.findIndex(
                    (g) => g.game._id === game._id
                );

                if (gameIndex !== -1) {
                    cart.games[gameIndex].quantity++;
                    cart.total += game.price - discount;
                    await cart.save();
                    res.json({ message: "Game added to cart successfully" });
                    return;
                }
            }

            if (!cart) {
                await CartModel.create({
                    userId: req.params.id,
                    games: [
                        {
                            game: game,
                            quantity: 1,
                            price: game.price - discount,
                        },
                    ],
                    total: game.price - discount,
                });
            } else {
                cart.games.push({
                    game: game,
                    quantity: 1,
                    price: game.price - discount,
                });
                cart.total += game.price - discount;
                await cart.save();
            }

            res.json({ message: "Game added to cart successfully" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /***
     * Remove from cart
     * @param req
     * @param res
     */
    public async removeFromCart(req: any, res: any): Promise<void> {
        try {
            const game = await GameModel.findById(req.params.gid);

            if (!game) {
                res.status(404).json({ message: "Game not found" });
                return;
            }

            const cart = await CartModel.findOne({ userId: req.params.id });

            if (!cart) {
                res.status(404).json({ message: "Cart not found" });
                return;
            }

            const gameIndex = cart.games.findIndex(
                (g) => g.game._id === game._id
            );

            if (gameIndex === -1) {
                res.status(404).json({ message: "Game not found in cart" });
                return;
            }

            cart.total -=
                cart.games[gameIndex].price * cart.games[gameIndex].quantity;
            cart.games.splice(gameIndex, 1);

            await cart.save();

            res.json({ message: "Game removed from cart successfully" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Get cart
     * @param req
     * @param res
     */

    public async getCart(req: any, res: any): Promise<void> {
        try {
            const cart = await CartModel.findOne({ userId: req.params.id });

            if (!cart) {
                res.status(404).json({ message: "Cart not found" });
                return;
            }
            res.json(cart);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Update cart
     * @param req
     * @param res
     */
    public async updateCart(req: any, res: any): Promise<void> {
        try {
            await CartModel.findOneAndUpdate(
                { userId: req.params.id },
                req.body
            );

            res.json({ message: "Cart updated successfully" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }
}

export default CartController;
