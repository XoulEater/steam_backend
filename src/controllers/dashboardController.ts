import { Request, Response } from "express";
import { GameModel } from "../models/Game";
import { OrderModel } from "../models/Order";
import { StockAlertModel } from "../models/StockAlert";

class DashboardController {
    /**
     * Top 5 most sold games
     * @param req
     * @param res
     */
    public async getMostSoldGames(req: Request, res: Response): Promise<void> {
        try {
            const games = await GameModel.find().sort({ sales: -1 }).limit(5);
            res.status(200).json(games);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Orders per day
     * @param req
     * @param res
     */

    public async getOrdersPerDay(req: Request, res: Response): Promise<void> {
        try {
            const orders = await OrderModel.aggregate([
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
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }

    /**
     * Get notifications
     * @param req
     * @param res
     */
    public async getNotifications(req: Request, res: Response): Promise<void> {
        try {
            // Get all notifications sorted by date
            const notifications = await StockAlertModel.find().sort({
                date: -1,
            });

            res.status(200).json(notifications);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }
}

export default DashboardController;
