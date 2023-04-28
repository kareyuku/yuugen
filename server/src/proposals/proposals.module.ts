import { Module, forwardRef } from "@nestjs/common";
import { ProposalsService } from "./services/proposals/proposals.service";
import { ProposalsController } from "./controllers/proposals/proposals.controller";
import { Proposal, ProposalScheme } from "src/schemas/proposal.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "src/users/users.module";
import { AnimeModule } from "src/anime/anime.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalScheme },
    ]),
    forwardRef(() => AnimeModule),
    UsersModule,
  ],
  providers: [
    {
      provide: "PROPOSAL_SERVICE",
      useClass: ProposalsService,
    },
  ],
  controllers: [ProposalsController],
  exports: ["PROPOSAL_SERVICE"],
})
export class ProposalsModule {}
