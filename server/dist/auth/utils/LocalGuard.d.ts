import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UsersService } from "src/users/services/users/users.service";
declare const LocalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalAuthGuard extends LocalAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class AdminGuard implements CanActivate {
    private readonly userService;
    constructor(userService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
