import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Transform } from "class-transformer";
import { HydratedDocument, Types } from "mongoose";

export type ReviewDocument = HydratedDocument<Tag>;

@Schema({ timestamps: true })
export class Tag {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({type: [Types.ObjectId], ref: "Anime" })
  animes: [Types.ObjectId]

}

export const TagSchema = SchemaFactory.createForClass(Tag);
