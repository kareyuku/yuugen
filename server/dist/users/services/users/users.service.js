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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../../schemas/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt_1 = require("../../../utils/bcrypt");
const group_schema_1 = require("../../../schemas/group.schema");
let UsersService = class UsersService {
    constructor(userModel, groupModel) {
        this.userModel = userModel;
        this.groupModel = groupModel;
    }
    async createUser(userDto) {
        const password = (0, bcrypt_1.encodePassword)(userDto.password);
        try {
            const createdUser = new this.userModel(Object.assign(Object.assign({}, userDto), { password }));
            await createdUser.save();
            return createdUser;
        }
        catch (err) {
            if (err.keyValue.username)
                throw new common_1.ConflictException("Nazwa użytkownika jest już zajęta.", {
                    description: "username",
                });
            if (err.keyValue.email)
                throw new common_1.ConflictException("Ten adres e-mail jest już zajęty.", {
                    description: "email",
                });
        }
    }
    async findUserByUsername(username) {
        return await this.userModel.findOne({ username });
    }
    async findUserById(id) {
        return await this.userModel.findById(id);
    }
    async createGroup(groupDto) {
        const owner = await this.findUserByUsername(groupDto.owner.toString());
        if (!owner)
            throw new common_1.BadRequestException("Użytkownik o podanej nazwie nie istnieje.");
        try {
            const group = new this.groupModel(groupDto);
            group.owner = owner._id;
            await group.save();
            return group;
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException("Tworzenie grupy nie powiodło się.");
        }
    }
    async findGroupByName(name) {
        return await this.groupModel.findOne({ name });
    }
    async patchGroup(groupDto, groupName) {
        if (groupDto.owner) {
            const owner = await this.findUserByUsername(groupDto.owner.toString());
            if (!owner)
                throw new common_1.BadRequestException("Użytkownik o podanej nazwie nie istnieje.");
            groupDto.owner = owner._id;
        }
        try {
            return await this.groupModel.findOneAndUpdate({ name: groupName }, groupDto, {
                returnOriginal: false,
            });
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException("Edycja grupy nie powiodła się.");
        }
    }
    async deleteGroup(groupName) {
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(group_schema_1.Group.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map