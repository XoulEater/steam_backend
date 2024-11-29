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
            const cart = await CartModel.findOne({ userId: req.params.cid });

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

            const cart = await CartModel.findOne({ userId: req.params.cid });

            if (!cart) {
                res.status(404).json({ message: "Cart not found" });
                return;
            }

            // console log the cart game ids
            console.log(cart.games.map((g) => g.game._id));
            console.log(game._id);

            const gameIndex = cart.games.findIndex(
                (g) => g.game._id.toString() === game._id.toString()
            );

            console.log(gameIndex);

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
            const cart = await CartModel.findOne({ userId: req.params.id });

            if (!cart) {
                res.status(404).json({ message: "Cart not found" });
                return;
            }

            const newCart = req.body;

            // Recalculate total
            let total = 0;
            newCart.games.forEach((game: any) => {
                if (game.game.discount.type !== "none") {
                    let discount = game.game.price;
                    game.game.discount.type === "percentage"
                        ? (discount -=
                              game.game.price * game.game.discount.value)
                        : (discount -= game.game.discount.value);
                    console.log(discount, game.quantity);
                    total += discount * game.quantity;
                } else {
                    console.log(game.game.price, game.quantity);
                    total += game.game.price * game.quantity;
                }
            });
            console.log(total);

            cart.games = newCart.games;
            cart.total = total;

            await cart.save();

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
