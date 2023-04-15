/// <reference types="passport" />
import { Request, Response } from "express";
import { UsersService } from "src/users/services/users/users.service";
export declare class AuthController {
    private readonly userService;
    constructor(userService: UsersService);
    login(req: Request, res: Response): Promise<void>;
    getAuthSession(session: Record<string, any>): Promise<Record<string, any>>;
    getAuthStatus(req: Request): Promise<Express.User>;
}
