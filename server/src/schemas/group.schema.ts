import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Transform } from "class-transformer";
import { HydratedDocument, Types } from "mongoose";

export type GroupDocument = HydratedDocument<Group>;

@Schema({ timestamps: true })
export class Group {
  @Transform(({obj}) => obj._id.toString())
  _id: Types.ObjectId;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  __v: number;

  @Prop({required: true})
  name: string;

  @Prop({type: Types.ObjectId, ref: "User", required: true})
  owner: Types.ObjectId;

  @Prop({type: [Types.ObjectId], ref:"User"})
  members: Types.ObjectId[];

  @Prop()
  img: string;

  @Prop({type: Number, default: 0})
  points: number;

}

export const GroupSchema = SchemaFactory.createForClass(Group);
