import { prop, getModelForClass } from "@typegoose/typegoose";

export class Review {
    @prop({ required: true })
    author!: string;

    @prop({ required: true })
    rating!: number;

    @prop({ required: true })
    comment!: string;
}

export const ReviewModel = getModelForClass(Review);
