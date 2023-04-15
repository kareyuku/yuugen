import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const MongoStore = require("connect-mongo");

  app.setGlobalPrefix("api");
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
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT);
}
bootstrap();
