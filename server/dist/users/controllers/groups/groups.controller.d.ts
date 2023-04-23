import { CreateGroupDto } from "src/users/dtos/CreateGroup.dto";
import { GroupsService } from "src/users/services/groups/groups.service";
export declare class GroupsController {
    private readonly groupService;
    constructor(groupService: GroupsService);
    createGroup(createGroupDto: CreateGroupDto): Promise<Object>;
    getGroup(group: string): Promise<string>;
    patchGroup(createGroupDto: CreateGroupDto, group: string): Promise<import("../../../schemas/group.schema").Group>;
    deleteGroup(group: string): Promise<Object>;
}
