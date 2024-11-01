"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./controllers/users/users.controller");
const users_service_1 = require("./services/users/users.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schemas/user.schema");
const user_controller_1 = require("./controllers/user/user.controller");
const groups_controller_1 = require("./controllers/groups/groups.controller");
const group_schema_1 = require("../schemas/group.schema");
const groups_service_1 = require("./services/groups/groups.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: group_schema_1.Group.name, schema: group_schema_1.GroupSchema },
            ]),
        ],
        controllers: [users_controller_1.UsersController, user_controller_1.UserController, groups_controller_1.GroupsController],
        providers: [
            {
                provide: "USER_SERVICE",
                useClass: users_service_1.UsersService,
            },
            {
                provide: "GROUP_SERVICE",
                useClass: groups_service_1.GroupsService,
            },
        ],
        exports: ["USER_SERVICE", "GROUP_SERVICE"]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map