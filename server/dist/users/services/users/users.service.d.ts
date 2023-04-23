import { CreateUserDto } from "src/users/dtos/CreateUser.dto";
import { User } from "src/schemas/user.schema";
import { Model, Types } from "mongoose";
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    isUserAllowed(userId: Types.ObjectId, matchId: Types.ObjectId): Promise<boolean>;
    addUser(userDto: CreateUserDto): Promise<User>;
    getAllAboutUser(id: Types.ObjectId): Promise<User>;
    findUserByUsername(username: string): Promise<User>;
    findUserById(id: Types.ObjectId): Promise<User>;
    createUser(userDto: CreateUserDto): Promise<void>;
}
