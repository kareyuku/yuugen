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
exports.TagsController = void 0;
const common_1 = require("@nestjs/common");
const tags_service_1 = require("../../services/tags/tags.service");
const LocalGuard_1 = require("../../../auth/utils/LocalGuard");
const tag_schema_1 = require("../../../schemas/tag.schema");
const mongooseClassSerializer_interceptor_1 = require("../../../utils/mongooseClassSerializer.interceptor");
const responses_1 = require("../../../utils/responses");
let TagsController = class TagsController {
    constructor(tagsService) {
        this.tagsService = tagsService;
    }
    async createTag(tag) {
        await this.tagsService.createTag(tag);
        return (0, responses_1.OKResponse)("Pomyślnie utworzono tag.");
    }
    async getTags() {
        return await this.tagsService.getAllTags();
    }
};
__decorate([
    (0, common_1.UseGuards)(LocalGuard_1.AdminGuard),
    (0, common_1.Post)(":tag"),
    __param(0, (0, common_1.Param)("tag")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "createTag", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)((0, mongooseClassSerializer_interceptor_1.default)(tag_schema_1.Tag)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "getTags", null);
TagsController = __decorate([
    (0, common_1.Controller)("tags"),
    __param(0, (0, common_1.Inject)("TAGS_SERVICE")),
    __metadata("design:paramtypes", [tags_service_1.TagsService])
], TagsController);
exports.TagsController = TagsController;
//# sourceMappingURL=tags.controller.js.map