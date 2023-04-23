import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Exclude } from "class-transformer";
import * as mongoose from "mongoose";
import { Anime } from "./anime.schema";

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Types.ObjectId;

  @Exclude()
  __v: number;

  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Prop({ required: true, unique: true })
  username: string;

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Exclude()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  avatar: string;

  @Prop({ default: "member" })
  rank: string;

  @Transform(({ value }) =>
    value.map((group) => ({
      ...group,
      owner: group.owner.toString(),
      _id: group._id.toString(),
      members: undefined,
      __v: undefined,
    }))
  )
  @Prop({ type: [mongoose.Types.ObjectId], ref: "Group", default: [] })
  groups: mongoose.Types.ObjectId[];

  @Prop({ default: 0, type: Number })
  status: number;

  @Prop({ default: 0, type: Number })
  points: number;

  /*
  @Prop({
    type: {
      watching: [
        {
          type: {
            animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime" },
            progress: { type: String },
          },
        },
      ],
      completed: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Anime" }],
      },
      planned: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Anime" }],
      },
      dropped: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Anime" }],
      },
    },
  })
  animeList: {
    watching: [
      {
        animeId: Anime;
        progress: number;
      }
    ];
    completed: [animeId: Anime];
    planned: [animeId: Anime];
    dropped: [animeId: Anime];
  };*/
}

export const UserSchema = SchemaFactory.createForClass(User);
