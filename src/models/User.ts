import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
    @prop({ required: true })
    public email!: string;

    @prop({ required: true })
    public password!: string;

    @prop({ required: true })
    public username!: string;

    @prop({ required: false, default: "" })
    public image!: string;

    @prop({ required: false, default: "" })
    public bio!: string;
}

export const UserModel = getModelForClass(User);
