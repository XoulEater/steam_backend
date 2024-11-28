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
                const game = req.body;
                console.log(game);
                const cart = yield Cart_1.CartModel.findOne({ userId: req.params.id });
                let discount = 0;
                if (game.discount.type != "none") {
                    discount = game.price;
                    game.discount.type === "percentage"
                        ? (discount -= game.price * game.discount.value)
                        : (discount -= game.discount.value);
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
                const game = req.body;
                const cart = yield Cart_1.CartModel.findOne({ userId: req.params.id });
                if (!cart) {
                    res.status(404).json({ message: "Cart not found" });
                    return;
                }
                console.log(cart);
                const gameIndex = cart.games.findIndex((g) => g.game._id === game._id);
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
                yield Cart_1.CartModel.findOneAndUpdate({ userId: req.params.id }, req.body);
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