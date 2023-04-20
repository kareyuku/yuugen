import { CreateGroupDto } from "src/users/dtos/CreateGroup.dto";
import { UsersService } from "src/users/services/users/users.service";
export declare class GroupsController {
    private readonly userService;
    constructor(userService: UsersService);
    createGroup(createGroupDto: CreateGroupDto): Promise<import("../../../schemas/group.schema").Group>;
    patchGroup(createGroupDto: CreateGroupDto, group: string): Promise<import("../../../schemas/group.schema").Group>;
    deleteGroup(group: string): Promise<void>;
}
