import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const MongoStore = require("connect-mongo");

  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  app.use(
    session({
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
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT);
}
bootstrap();
