import { CreateGroupDto } from "src/users/dtos/CreateGroup.dto";
import { GroupsService } from "src/users/services/groups/groups.service";
export declare class GroupsController {
    private readonly groupService;
    constructor(groupService: GroupsService);
    createGroup(createGroupDto: CreateGroupDto): Promise<Object>;
    getGroup(groupId: string): Promise<import("../../../schemas/group.schema").Group>;
    patchGroup(createGroupDto: CreateGroupDto, groupId: string): Promise<import("../../../schemas/group.schema").Group>;
    deleteGroup(groupId: string): Promise<Object>;
}
