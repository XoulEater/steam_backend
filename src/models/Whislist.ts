import { prop, getModelForClass } from "@typegoose/typegoose";
import { Game } from "./Game";

export class Whislist {
    @prop({ required: true })
    public userId!: string;

    @prop({ required: true, default: [] })
    public games!: Game[];
}

export const WhislistModel = getModelForClass(Whislist);
