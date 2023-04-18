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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const CreateUser_dto_1 = require("../../dtos/CreateUser.dto");
const users_service_1 = require("../../services/users/users.service");
const mongooseClassSerializer_interceptor_1 = require("../../../utils/mongooseClassSerializer.interceptor");
const user_schema_1 = require("../../../schemas/user.schema");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(createUserDto) {
        return await this.userService.createUser(createUserDto) ? "Pomyślnie zarejestrowano." : "Error";
    }
    async getUserByUsername(username) {
        const user = await this.userService.findUserByUsername(username);
        if (!user)
            throw new common_1.NotFoundException("Nie znaleziono użytkownika.");
        return user;
    }
};
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseInterceptors)((0, mongooseClassSerializer_interceptor_1.default)(user_schema_1.User)),
    (0, common_1.Get)(":username"),
    __param(0, (0, common_1.Param)("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserByUsername", null);
UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __param(0, (0, common_1.Inject)("USER_SERVICE")),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map