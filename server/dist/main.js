"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const MongoStore = require("connect-mongo");
    app.enableCors({
        origin: "http://localhost:3000",
        credentials: true,
    });
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.use(session({
        name: "SESSION_ID",
        secret: "vts4ETsetSEV$TSe42qV@#V$Q34",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60 * 24,
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URL,
            crypto: {
                secret: "DFGW345gse5tQ@#$R!@DF!#E",
            },
        }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map