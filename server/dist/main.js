"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
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
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map