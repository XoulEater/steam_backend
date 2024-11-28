import { Router } from "express";
import DashboardController from "../controllers/dashboardController";

const router = Router();
const dashboardController = new DashboardController();

router.get("/most-sold-games", dashboardController.getMostSoldGames);
router.get("/orders-per-day", dashboardController.getOrdersPerDay);

export default router;
