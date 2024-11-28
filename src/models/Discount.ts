import { prop, getModelForClass } from "@typegoose/typegoose";

export class Discount {
    @prop({ required: true })
    type!: string;

    @prop({ required: false })
    value!: number;

    @prop({ required: false })
    until!: Date;

    constructor() {
        this.type = "none";
    }
}
