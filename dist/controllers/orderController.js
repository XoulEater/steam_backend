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
const Cart_1 = require("./../models/Cart");
const Order_1 = require("./../models/Order");
const StockAlert_1 = require("../models/StockAlert");
class OrderController {
    /**
     * Create order
     * @param req
     * @param res
     */
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get the cart from the user
                const cart = yield Cart_1.CartModel.findOne({ userId: req.params.id });
                const { address, paymentMethod } = req.body;
                if (!cart || cart.games.length === 0) {
                    res.status(404).send({ message: "Cart not found" });
                    return;
                }
                // create the order
                yield Order_1.OrderModel.create({
                    userId: req.params.id,
                    games: cart.games,
                    total: cart.total,
                    address,
                    paymentMethod,
                });
                // Reduce the stock of the games
                cart.games.forEach((game) => __awaiter(this, void 0, void 0, function* () {
                    const updatedGame = yield Game_1.GameModel.findOneAndUpdate({ _id: game.game._id }, { $inc: { stock: -game.quantity, sales: game.quantity } }, { new: true });
                    if (!updatedGame) {
                        res.status(404).send({ message: "Game not found" });
                        return;
                    }
                    if (updatedGame.stock <= 5) {
                        yield StockAlert_1.StockAlertModel.create({
                            game: game.game.title,
                            stock: updatedGame.stock,
                        });
                    }
                }));
                // clear the cart
                cart.games = [];
                cart.total = 0;
                yield cart.save();
                res.status(201).send({ message: "Order created" });
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
     * Get orders by user id
     * @param req
     * @param res
     */
    getOrdersByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield Order_1.OrderModel.find({ userId: req.params.id });
                res.send(orders);
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
     * Get all orders
     * @param req
     * @param res
     */
    getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield Order_1.OrderModel.find();
                res.send(orders);
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
     * Modify order status
     * @param req
     * @param res
     */
    modifyOrderStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.body;
                const order = yield Order_1.OrderModel.findById(req.params.id);
                if (!order) {
                    res.status(404).json({ message: "Order not found" });
                    return;
                }
                order.status = status;
                yield order.save();
                res.json(order);
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
exports.default = OrderController;
//# sourceMappingURL=orderController.js.map