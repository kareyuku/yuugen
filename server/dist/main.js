"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const MongoStore = require("connect-mongo");
    app.setGlobalPrefix("api");
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
        }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map