import * as mongoose from "mongoose";
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
    groups: mongoose.Types.ObjectId[];
    status: number;
    points: number;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & Omit<User & Required<{
    _id: mongoose.Types.ObjectId;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & Omit<mongoose.FlatRecord<User> & Required<{
    _id: mongoose.Types.ObjectId;
}>, never>>;
