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
const Order_1 = require("../models/Order");
const StockAlert_1 = require("../models/StockAlert");
class DashboardController {
    /**
     * Top 5 most sold games
     * @param req
     * @param res
     */
    getMostSoldGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield Game_1.GameModel.find().sort({ sales: -1 }).limit(5);
                res.status(200).json(games);
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
     * Orders per day
     * @param req
     * @param res
     */
    getOrdersPerDay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield Order_1.OrderModel.aggregate([
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$createdAt",
                                },
                            },
                            total: { $sum: 1 },
                        },
                    },
                ]).sort({ _id: 1 });
                res.status(200).json(orders);
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
     * Get notifications
     * @param req
     * @param res
     */
    getNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get all notifications sorted by date
                const notifications = yield StockAlert_1.StockAlertModel.find().sort({
                    date: -1,
                });
                res.status(200).json(notifications);
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
exports.default = DashboardController;
//# sourceMappingURL=dashboardController.js.map