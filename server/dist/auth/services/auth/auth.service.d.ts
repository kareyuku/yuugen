import { UsersService } from 'src/users/services/users/users.service';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UsersService);
    validateUser(username: string, password: string): Promise<import("../../../schemas/user.schema").User>;
}
