import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Transform } from "class-transformer";
import { HydratedDocument, Types } from "mongoose";

export type ProposalDocument = HydratedDocument<Proposal>;

@Schema({ timestamps: true })
export class Proposal {
  @Transform(({ obj }) => obj._id.toString())
  _id: Types.ObjectId;

  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  @Transform(({ obj }) => obj.addedBy.toString())
  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  addedBy: Types.ObjectId;

  @Prop({ required: true, type: Number })
  proposalType: number;

  @Prop({ required: true, type: {} })
  data: {};
}

export const ProposalScheme = SchemaFactory.createForClass(Proposal);
