import * as mongoose from "mongoose";
import { Anime } from "./anime.schema";
export type UserDocument = mongoose.HydratedDocument<User>;
export declare class User {
    _id: mongoose.Types.ObjectId;
    __v: number;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    password: string;
    email: string;
    avatar: string;
    rank: string;
    status: number;
    points: number;
    animeList: {
        watching: [
            {
                animeId: Anime;
                progress: number;
            }
        ];
        completed: [animeId: Anime];
        planned: [animeId: Anime];
        dropped: [animeId: Anime];
    };
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & Omit<User & Required<{
    _id: mongoose.Types.ObjectId;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & Omit<mongoose.FlatRecord<User> & Required<{
    _id: mongoose.Types.ObjectId;
}>, never>>;
