import express from "express";
import mongoose from "mongoose";
import gameRoutes from "./routes/game";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

const start = async (): Promise<void> => {
    try {
        await mongoose.connect(
            "mongodb+srv://whiit:1228@guiatec.95rtdmj.mongodb.net/Steam?retryWrites=true&w=majority&appName=GuiaTEC"
        );
        app.listen(3000, () => {
            console.log("Server started on http://localhost:3000");
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

app.use("/games", gameRoutes);

void start();
