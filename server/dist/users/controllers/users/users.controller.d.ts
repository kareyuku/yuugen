import { CreateUserDto } from "src/users/dtos/CreateUser.dto";
import { UsersService } from "src/users/services/users/users.service";
import { User } from "src/schemas/user.schema";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<"Pomyślnie zarejestrowano." | "Error">;
    getUserByUsername(username: string): Promise<User>;
}
