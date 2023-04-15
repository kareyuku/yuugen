"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const controllers_controller_1 = require("./controllers/auth/controllers.controller");
const auth_service_1 = require("./services/auth/auth.service");
const users_service_1 = require("../users/services/users/users.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schemas/user.schema");
const passport_1 = require("@nestjs/passport");
const LocalStrategy_1 = require("./utils/LocalStrategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            passport_1.PassportModule,
        ],
        controllers: [controllers_controller_1.ControllersController],
        providers: [
            {
                provide: 'AUTH_SERVICE',
                useClass: auth_service_1.AuthService,
            },
            {
                provide: 'USER_SERVICE',
                useClass: users_service_1.UsersService,
            },
            LocalStrategy_1.LocalStrategy,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map