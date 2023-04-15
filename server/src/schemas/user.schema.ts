import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true, unique: true})
    username: string

    @Prop({required: true})
    password: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop()
    avatar: string;

    @Prop({default: 'member'})
    rank: string;

    @Prop({type: Object})
    animeList: Object;
}

export const UserSchema = SchemaFactory.createForClass(User); 