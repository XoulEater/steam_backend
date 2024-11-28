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
const Wishlist_1 = require("./../models/Wishlist");
class WishlistController {
    /**
     * Add to wishlist
     * @param req
     * @param res
     */
    addToWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = req.body;
                const wishlist = yield Wishlist_1.WishlistModel.findOne({
                    userId: req.params.id,
                });
                if (!wishlist) {
                    yield Wishlist_1.WishlistModel.create({
                        userId: req.params.id,
                        games: [game],
                    });
                }
                else {
                    wishlist.games.push(game);
                    yield wishlist.save();
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
     * Remove from wishlist
     * @param req
     * @param res
     */
    removeFromWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = req.body;
                const wishlist = yield Wishlist_1.WishlistModel.findOne({
                    userId: req.params.id,
                });
                if (!wishlist) {
                    res.status(404).json({ message: "Wishlist not found" });
                    return;
                }
                wishlist.games = wishlist.games.filter((g) => g._id.toString() !== game._id);
                yield wishlist.save();
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
     * Get wishlist by user id
     * @param req
     * @param res
     */
    getWishlistByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wishlist = yield Wishlist_1.WishlistModel.findOne({
                    userId: req.params.id,
                });
                res.status(200).json(wishlist === null || wishlist === void 0 ? void 0 : wishlist.games);
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
exports.default = WishlistController;
//# sourceMappingURL=wishlistController.js.map