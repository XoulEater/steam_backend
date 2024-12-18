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
class CartController {
    /***
     * Add to cart
     * @param req
     * @param res
     */
    addToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield Game_1.GameModel.findById(req.params.gid);
                if (!game) {
                    res.status(404).json({ message: "Game not found" });
                    return;
                }
                const cart = yield Cart_1.CartModel.findOne({ userId: req.params.cid });
                let discount = 0;
                if (game.discount.type != "none") {
                    game.discount.type === "percentage"
                        ? (discount = game.price * (game.discount.value / 100))
                        : (discount = game.discount.value);
                }
                console.log(discount);
                // if game in cart already, increase quantity
                if (cart && cart.games.length > 0) {
                    const gameIndex = cart.games.findIndex((g) => g.game._id === game._id);
                    if (gameIndex !== -1) {
                        cart.games[gameIndex].quantity++;
                        cart.total += game.price - discount;
                        yield cart.save();
                        res.json({ message: "Game added to cart successfully" });
                        return;
                    }
                }
                if (!cart) {
                    yield Cart_1.CartModel.create({
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
                }
                else {
                    cart.games.push({
                        game: game,
                        quantity: 1,
                        price: game.price - discount,
                    });
                    console.log(game.price, discount);
                    cart.total += game.price - discount;
                    yield cart.save();
                }
                res.json({ message: "Game added to cart successfully" });
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
    /***
     * Remove from cart
     * @param req
     * @param res
     */
    removeFromCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield Game_1.GameModel.findById(req.params.gid);
                if (!game) {
                    res.status(404).json({ message: "Game not found" });
                    return;
                }
                const cart = yield Cart_1.CartModel.findOne({ userId: req.params.cid });
                if (!cart) {
                    res.status(404).json({ message: "Cart not found" });
                    return;
                }
                // console log the cart game ids
                const gameIndex = cart.games.findIndex((g) => g.game._id.toString() === game._id.toString());
                console.log(gameIndex);
                if (gameIndex === -1) {
                    res.status(404).json({ message: "Game not found in cart" });
                    return;
                }
                cart.total -=
                    cart.games[gameIndex].price * cart.games[gameIndex].quantity;
                cart.games.splice(gameIndex, 1);
                yield cart.save();
                res.json({ message: "Game removed from cart successfully" });
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
     * Get cart
     * @param req
     * @param res
     */
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield Cart_1.CartModel.findOne({ userId: req.params.id });
                if (!cart) {
                    res.status(404).json({ message: "Cart not found" });
                    return;
                }
                res.json(cart);
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
     * Update cart
     * @param req
     * @param res
     */
    updateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield Cart_1.CartModel.findOne({ userId: req.params.id });
                if (!cart) {
                    res.status(404).json({ message: "Cart not found" });
                    return;
                }
                const newCart = req.body;
                // Recalculate total
                let total = 0;
                newCart.games.forEach((game) => {
                    if (game.game.discount.type !== "none") {
                        let discount = game.game.price;
                        game.game.discount.type === "percentage"
                            ? (discount -=
                                game.game.price *
                                    (game.game.discount.value / 100))
                            : (discount -= game.game.discount.value);
                        console.log(discount, game.quantity);
                        total += discount * game.quantity;
                    }
                    else {
                        console.log(game.game.price, game.quantity);
                        total += game.game.price * game.quantity;
                    }
                });
                console.log(total);
                cart.games = newCart.games;
                cart.total = total;
                yield cart.save();
                res.json({ message: "Cart updated successfully" });
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
exports.default = CartController;
//# sourceMappingURL=cartController.js.map