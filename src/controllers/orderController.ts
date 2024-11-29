import { GameModel } from "../models/Game";
import { CartModel } from "./../models/Cart";
import { OrderModel } from "./../models/Order";
import { Request, Response } from "express";
import { StockAlertModel } from "../models/StockAlert";

class OrderController {
    /**
     * Create order
     * @param req
     * @param res
     */
    public async createOrder(req: any, res: any): Promise<void> {
        try {
            // get the cart from the user
            const cart = await CartModel.findOne({ userId: req.params.id });

            const { address, paymentMethod } = req.body;

            if (!cart || cart.games.length === 0) {
                res.status(404).send({ message: "Cart not found" });
                return;
            }

            // create the order
            await OrderModel.create({
                userId: req.params.id,
                games: cart.games.map((game) => ({
                    game: game.game,
                })),
                total: cart.total,
                address,
                paymentMethod,
            });

            // Reduce the stock of the games
            cart.games.forEach(async (game) => {
                const updatedGame = await GameModel.findOneAndUpdate(
                    { _id: game.game._id },
                    { $inc: { stock: -game.quantity, sales: game.quantity } },
                    { new: true }
                );

                if (!updatedGame) {
                    res.status(404).send({ message: "Game not found" });
                    return;
                }

                if (updatedGame.stock <= 5) {
                    await StockAlertModel.create({
                        game: game.game.title,
                        stock: req.body.stock,
                    });
                }
            });

            // clear the cart
            cart.games = [];
            cart.total = 0;
            await cart.save();

            res.status(201).send({ message: "Order created" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Get orders by user id
     * @param req
     * @param res
     */
    public async getOrdersByUserId(req: any, res: any): Promise<void> {
        try {
            const orders = await OrderModel.find({ userId: req.params.id });

            res.send(orders);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Get all orders
     * @param req
     * @param res
     */
    public async getAllOrders(req: any, res: any): Promise<void> {
        try {
            const orders = await OrderModel.find();

            res.send(orders);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Modify order status
     * @param req
     * @param res
     */
    public async modifyOrderStatus(req: any, res: any): Promise<void> {
        try {
            const { status } = req.body;

            const order = await OrderModel.findById(req.params.id);

            if (!order) {
                res.status(404).json({ message: "Order not found" });
                return;
            }

            order.status = status;
            await order.save();

            res.json(order);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }
}

export default OrderController;
