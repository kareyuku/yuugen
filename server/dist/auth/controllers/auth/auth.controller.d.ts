/// <reference types="passport" />
import { Request } from "express";
export declare class AuthController {
    login(): Promise<void>;
    getAuthSession(session: Record<string, any>): Promise<Record<string, any>>;
    getAuthStatus(req: Request): Promise<Express.User>;
}
