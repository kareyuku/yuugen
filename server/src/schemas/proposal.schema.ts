import { Schema } from "@nestjs/mongoose";
import { Exclude, Transform } from "class-transformer";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Proposal {
  @Transform(({ obj }) => obj._id.toString())
  _id: Types.ObjectId;

  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
