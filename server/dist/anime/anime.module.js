"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeModule = void 0;
const common_1 = require("@nestjs/common");
const anime_controller_1 = require("./controllers/anime/anime.controller");
const anime_service_1 = require("./services/anime/anime.service");
const mongoose_1 = require("@nestjs/mongoose");
const anime_schema_1 = require("../schemas/anime.schema");
const reviews_controller_1 = require("./controllers/reviews/reviews.controller");
const reviews_service_1 = require("./services/reviews/reviews.service");
const review_schema_1 = require("../schemas/review.schema");
const users_module_1 = require("../users/users.module");
let AnimeModule = class AnimeModule {
};
AnimeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: anime_schema_1.Anime.name, schema: anime_schema_1.AnimeSchema },
                {
                    name: review_schema_1.Review.name,
                    schema: review_schema_1.ReviewSchema,
                },
            ]),
            users_module_1.UsersModule,
        ],
        controllers: [anime_controller_1.AnimeController, reviews_controller_1.ReviewsController],
        providers: [
            {
                provide: "ANIME_SERVICE",
                useClass: anime_service_1.AnimeService,
            },
            {
                provide: "REVIEW_SERVICE",
                useClass: reviews_service_1.ReviewsService,
            },
        ],
    })
], AnimeModule);
exports.AnimeModule = AnimeModule;
//# sourceMappingURL=anime.module.js.map