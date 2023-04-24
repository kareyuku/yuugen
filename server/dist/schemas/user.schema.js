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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose = require("mongoose");
let User = class User {
};
__decorate([
    (0, class_transformer_1.Transform)(({ obj }) => obj._id.toString()),
    __metadata("design:type", mongoose.Types.ObjectId)
], User.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], User.prototype, "__v", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "member" }),
    __metadata("design:type", String)
], User.prototype, "rank", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value.map((group) => (Object.assign(Object.assign({}, group), { owner: group.owner.toString(), _id: group._id.toString(), members: undefined, __v: undefined })))),
    (0, mongoose_1.Prop)({ type: [mongoose.Types.ObjectId], ref: "Group", default: [] }),
    __metadata("design:type", Array)
], User.prototype, "groups", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, type: Number }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, type: Number }),
    __metadata("design:type", Number)
], User.prototype, "points", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map