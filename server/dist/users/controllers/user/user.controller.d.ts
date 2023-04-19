import { Request } from "express";
import { User } from "src/schemas/user.schema";
import { UsersService } from "src/users/services/users/users.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    getUser(req: Request): Promise<User>;
}
