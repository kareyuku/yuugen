import { PassportSerializer } from "@nestjs/passport";
import { Types } from "mongoose";
import { User } from "src/schemas/user.schema";
import { UsersService } from "src/users/services/users/users.service";
export declare class SessionSerializer extends PassportSerializer {
    private readonly userService;
    constructor(userService: UsersService);
    serializeUser(userId: Types.ObjectId, done: (err: any, userId: Types.ObjectId) => void): void;
    deserializeUser(userId: Types.ObjectId, done: (err: any, userId: User) => void): Promise<void>;
}
