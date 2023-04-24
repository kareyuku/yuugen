"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const LocalGuard_1 = require("../../../auth/utils/LocalGuard");
const CreateGroup_dto_1 = require("../../dtos/CreateGroup.dto");
const PatchGroup_dto_1 = require("../../dtos/PatchGroup.dto");
const groups_service_1 = require("../../services/groups/groups.service");
const responses_1 = require("../../../utils/responses");
let GroupsController = class GroupsController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async createGroup(req, createGroupDto) {
        await this.groupService.createGroup(createGroupDto, new mongoose_1.Types.ObjectId(req.user.toString()));
        return (0, responses_1.OKResponse)("Pomyślnie utworzono grupę.");
    }
    async getGroup(groupId) {
        try {
            groupId = new mongoose_1.Types.ObjectId(groupId);
        }
        catch (_a) {
            throw new common_1.BadRequestException("Zły format id grupy.");
        }
        const foundGroup = await this.groupService.findGroupById(groupId);
        if (!foundGroup)
            throw new common_1.BadRequestException("Nie znaleziono podanej grupy.");
        return foundGroup;
    }
    async patchGroup(patchGroupDto, groupId, req) {
        try {
            groupId = new mongoose_1.Types.ObjectId(groupId);
        }
        catch (_a) {
            throw new common_1.BadRequestException("Zły format id grupy.");
        }
        return await this.groupService.patchGroup(patchGroupDto, groupId, new mongoose_1.Types.ObjectId(req.user.toString()));
    }
    async deleteGroup(groupId, req) {
        try {
            groupId = new mongoose_1.Types.ObjectId(groupId);
        }
        catch (_a) {
            throw new common_1.BadRequestException("Zły format id grupy.");
        }
        await this.groupService.deleteGroup(groupId, new mongoose_1.Types.ObjectId(req.user.toString()));
        return (0, responses_1.OKResponse)("Pomyślnie usunięto grupę.");
    }
    async addUserToGroup(groupId, userToAdd, req) {
        try {
            groupId = new mongoose_1.Types.ObjectId(groupId);
        }
        catch (_a) {
            throw new common_1.BadRequestException("Zły format id grupy.");
        }
        await this.groupService.addUserToGroup(groupId, userToAdd, new mongoose_1.Types.ObjectId(req.user.toString()));
        return (0, responses_1.OKResponse)("Pomyślnie dodano do grupy.");
    }
    async removeUserFromGroup(groupId, userToRemove, req) {
        try {
            groupId = new mongoose_1.Types.ObjectId(groupId);
        }
        catch (_a) {
            throw new common_1.BadRequestException("Zły format id grupy.");
        }
        await this.groupService.removeUserFromGroup(groupId, userToRemove, new mongoose_1.Types.ObjectId(req.user.toString()));
        return (0, responses_1.OKResponse)("Pomyślnie usunięto z grupy.");
    }
};
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateGroup_dto_1.CreateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Get)(":groupId"),
    __param(0, (0, common_1.Param)("groupId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "getGroup", null);
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    (0, common_1.Patch)(":groupId"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("groupId")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PatchGroup_dto_1.PatchGroupDto, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "patchGroup", null);
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    (0, common_1.Delete)(":groupId"),
    __param(0, (0, common_1.Param)("groupId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "deleteGroup", null);
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    (0, common_1.Put)(":groupId/:user"),
    __param(0, (0, common_1.Param)("groupId")),
    __param(1, (0, common_1.Param)("user")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "addUserToGroup", null);
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AuthenticatedGuard),
    (0, common_1.Delete)(":groupId/:user"),
    __param(0, (0, common_1.Param)("groupId")),
    __param(1, (0, common_1.Param)("user")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "removeUserFromGroup", null);
GroupsController = __decorate([
    (0, common_1.Controller)("groups"),
    __param(0, (0, common_1.Inject)("GROUP_SERVICE")),
    __metadata("design:paramtypes", [groups_service_1.GroupsService])
], GroupsController);
exports.GroupsController = GroupsController;
//# sourceMappingURL=groups.controller.js.map