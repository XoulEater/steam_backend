"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = __importDefault(require("../controllers/dashboardController"));
const router = (0, express_1.Router)();
const dashboardController = new dashboardController_1.default();
router.get("/most-sold-games", dashboardController.getMostSoldGames);
router.get("/orders-per-day", dashboardController.getOrdersPerDay);
// Notificaciones
exports.default = router;
//# sourceMappingURL=dashboard.js.map