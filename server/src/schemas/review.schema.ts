import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Transform } from "class-transformer";
import { HydratedDocument, ObjectId, Types } from "mongoose";

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: Number })
  rate: number;

  @Prop({ required: true, type: Types.ObjectId, ref: "Anime" })
  addedTo: ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  addedBy: ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
