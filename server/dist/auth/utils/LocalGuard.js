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
exports.AdminGuard = exports.AuthenticatedGuard = exports.LocalAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const mongoose_1 = require("mongoose");
const users_service_1 = require("../../users/services/users/users.service");
const Ranks_1 = require("./Ranks");
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)("local") {
    async canActivate(context) {
        const result = (await super.canActivate(context));
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
};
LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;
let AuthenticatedGuard = class AuthenticatedGuard {
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        return req.isAuthenticated();
    }
};
AuthenticatedGuard = __decorate([
    (0, common_1.Injectable)()
], AuthenticatedGuard);
exports.AuthenticatedGuard = AuthenticatedGuard;
let AdminGuard = class AdminGuard {
    constructor(userService) {
        this.userService = userService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        if (!req.isAuthenticated())
            return false;
        const user = await this.userService.findUserById(new mongoose_1.Types.ObjectId(req.user.toString()));
        return user.rank === Ranks_1.default.Admin;
    }
};
AdminGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("USER_SERVICE")),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AdminGuard);
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=LocalGuard.js.map