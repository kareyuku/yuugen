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
const LocalGuard_1 = require("../../../auth/utils/LocalGuard");
const CreateGroup_dto_1 = require("../../dtos/CreateGroup.dto");
const users_service_1 = require("../../services/users/users.service");
let GroupsController = class GroupsController {
    constructor(userService) {
        this.userService = userService;
    }
    async createGroup(createGroupDto) {
        return await this.userService.createGroup(createGroupDto);
    }
    async patchGroup(createGroupDto, group) {
        return await this.userService.patchGroup(createGroupDto, group);
    }
    async deleteGroup(group) {
    }
};
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AdminGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateGroup_dto_1.CreateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "createGroup", null);
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AdminGuard),
    (0, common_1.Patch)(":group"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("group")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateGroup_dto_1.CreateGroupDto, String]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "patchGroup", null);
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AdminGuard),
    (0, common_1.Delete)(":group"),
    __param(0, (0, common_1.Param)('group')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "deleteGroup", null);
GroupsController = __decorate([
    (0, common_1.Controller)("groups"),
    __param(0, (0, common_1.Inject)("USER_SERVICE")),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], GroupsController);
exports.GroupsController = GroupsController;
//# sourceMappingURL=groups.controller.js.map