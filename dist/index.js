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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const game_1 = __importDefault(require("./routes/game"));
const user_1 = __importDefault(require("./routes/user"));
const cart_1 = __importDefault(require("./routes/cart"));
const orders_1 = __importDefault(require("./routes/orders"));
const wishlist_1 = __importDefault(require("./routes/wishlist"));
// import dashboardRoutes from "./routes/dashboard";
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb+srv://whiit:1228@guiatec.95rtdmj.mongodb.net/Steam?retryWrites=true&w=majority&appName=GuiaTEC");
        app.listen(3000, () => {
            console.log("Server started on http://localhost:3000");
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
app.use("/games", game_1.default);
app.use("/users", user_1.default);
app.use("/cart", cart_1.default);
app.use("/orders", orders_1.default);
app.use("/wishlist", wishlist_1.default);
// app.use("/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
void start();
//# sourceMappingURL=index.js.map