import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    createUser(userDto: CreateUserDto): Promise<User>;
    findUserByUsername(username: string): Promise<User>;
}
