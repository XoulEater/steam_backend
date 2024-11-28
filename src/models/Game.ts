import { prop, getModelForClass } from "@typegoose/typegoose";
import { Discount } from "./Discount";
import { Review } from "./Review";
import { Types } from "mongoose";

export class Category {
    @prop({ required: true })
    public name!: string;

    @prop({ type: () => Category, default: [] })
    public parentCategories!: Category[];
}

export class Game {
    @prop({ required: false, default: new Types.ObjectId() })
    public _id!: Types.ObjectId;

    @prop({ required: true })
    public title!: string;

    @prop({ required: false, default: "" })
    public description!: string;

    @prop({ required: true })
    public developer!: string;

    @prop({ required: false, default: [] })
    public keywords!: string[];

    @prop({ required: true })
    public categories!: Category[];

    @prop({ required: false, default: 0 })
    public price!: number;

    @prop({
        required: false,
        default: {
            OS: "",
            Processor: "",
            Memory: "",
            Graphics: "",
            DirectX: "",
            Storage: "",
        },
    })
    public specs!: {
        OS: string;
        Processor: string;
        Memory: string;
        Graphics: string;
        DirectX: string;
        Storage: string;
    };

    @prop({ required: false, default: 0 })
    public popularity!: number;

    @prop({ required: false, default: 0 })
    public stock!: number;

    @prop({ required: true })
    public images!: string[];

    @prop({ required: false, default: new Discount() })
    public discount!: Discount;

    @prop({ required: true })
    public reviews!: Review[];

    @prop({ required: false, default: () => new Date().toISOString() })
    public releaseDate!: string;

    @prop({ required: false, default: () => new Date() })
    public createdAt!: Date;

    @prop({ required: false, default: 0 })
    public sales!: number;
}

export const GameModel = getModelForClass(Game);
