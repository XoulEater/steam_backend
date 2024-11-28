import { prop, getModelForClass } from "@typegoose/typegoose";

export class Cart {
    @prop({ required: true })
    public userId!: string;

    @prop({ required: true, type: () => [Object] })
    public games!: {
        game: string;
        quantity: number;
        price: number;
    }[];

    @prop({ required: true })
    public total!: number;
}

export const CartModel = getModelForClass(Cart);
