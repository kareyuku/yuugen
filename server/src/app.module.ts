import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { AnimeModule } from "./anime/anime.module";
import { ProposalsModule } from './proposals/proposals.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      autoIndex: true,
    }),
    PassportModule.register({
      session: true,
    }),
    UsersModule,
    AuthModule,
    AnimeModule,
    ProposalsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
