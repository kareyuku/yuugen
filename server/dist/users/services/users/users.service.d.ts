import { CreateUserDto } from "src/users/dtos/CreateUser.dto";
import { User } from "src/schemas/user.schema";
import { Model, Types } from "mongoose";
import { Group } from "src/schemas/group.schema";
import { CreateGroupDto } from "src/users/dtos/CreateGroup.dto";
export declare class UsersService {
    private userModel;
    private groupModel;
    constructor(userModel: Model<User>, groupModel: Model<Group>);
    createUser(userDto: CreateUserDto): Promise<User>;
    findUserByUsername(username: string): Promise<User>;
    findUserById(id: Types.ObjectId): Promise<User>;
    createGroup(groupDto: CreateGroupDto): Promise<Group>;
    findGroupByName(name: string): Promise<Group>;
    getGroup(groupName: string): Promise<Group>;
    patchGroup(groupDto: CreateGroupDto, groupName: string): Promise<Group>;
    deleteGroup(groupName: string): Promise<void>;
}
