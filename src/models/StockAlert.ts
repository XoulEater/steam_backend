import { prop, getModelForClass } from "@typegoose/typegoose";

// Notification when stock is low
export class StockAlert {
    @prop({ required: true })
    public game!: string;

    @prop({ required: true })
    public stock!: number;

    @prop({ required: true, default: new Date() })
    public date!: Date;
}

export const StockAlertModel = getModelForClass(StockAlert);
