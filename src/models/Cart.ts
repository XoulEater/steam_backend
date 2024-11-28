import { prop, getModelForClass } from "@typegoose/typegoose";
import { Game } from "./Game";

export class Cart {
    @prop({ required: true })
    public userId!: string;

    @prop({ required: true, type: () => [Object] })
    public games!: {
        game: Game;
        quantity: number;
        price: number;
    }[];

    @prop({ required: true })
    public total!: number;
}

export const CartModel = getModelForClass(Cart);
