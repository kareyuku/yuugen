import { PassportSerializer } from "@nestjs/passport";
import { Types } from "mongoose";
import { UsersService } from "src/users/services/users/users.service";
export declare class SessionSerializer extends PassportSerializer {
    private readonly userService;
    constructor(userService: UsersService);
    serializeUser(userId: Types.ObjectId, done: (err: any, userId: Types.ObjectId) => void): void;
    deserializeUser(userId: Types.ObjectId, done: (err: any, userId: Types.ObjectId) => void): Promise<void>;
}
