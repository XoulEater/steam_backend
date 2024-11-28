import { prop, getModelForClass } from "@typegoose/typegoose";

export class Order {
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

    @prop({ required: true })
    public address!: string;

    @prop({ required: true })
    public paymentMethod!: string;

    @prop({
        required: true,
        type: String,
        enum: ["pending", "inPreparation", "sent", "delivered"],
    })
    public status!: string;

    @prop({ required: true })
    public createdAt!: Date;
}

export const OrderModel = getModelForClass(Order);
