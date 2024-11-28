import { Request, Response } from "express";
import { GameModel } from "../models/Game";
import { OrderModel } from "../models/Order";

class DashboardController {
    /**
     * Top 5 most sold games
     * @param req
     * @param res
     */
    public async getMostSoldGames(req: Request, res: Response): Promise<void> {
        try {
            const games = await GameModel.find().sort({ sold: -1 }).limit(5);
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
}
