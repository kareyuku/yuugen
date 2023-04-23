import { Request } from "express";
import { Types } from "mongoose";
import { CreateGroupDto } from "src/users/dtos/CreateGroup.dto";
import { PatchGroupDto } from "src/users/dtos/PatchGroup.dto";
import { GroupsService } from "src/users/services/groups/groups.service";
export declare class GroupsController {
    private readonly groupService;
    constructor(groupService: GroupsService);
    createGroup(createGroupDto: CreateGroupDto): Promise<Object>;
    getGroup(groupId: string | Types.ObjectId): Promise<import("../../../schemas/group.schema").Group>;
    patchGroup(patchGroupDto: PatchGroupDto, groupId: string | Types.ObjectId, req: Request): Promise<import("../../../schemas/group.schema").Group>;
    deleteGroup(groupId: string | Types.ObjectId, req: Request): Promise<Object>;
    addUserToGroup(groupId: string | Types.ObjectId, userToAdd: string, req: Request): Promise<Object>;
    removeUserFromGroup(groupId: string | Types.ObjectId, userToRemove: string, req: Request): Promise<Object>;
}
