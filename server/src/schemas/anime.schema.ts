import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Exclude } from "class-transformer";
import { Date, HydratedDocument, Types } from "mongoose";

export type AnimeDocument = HydratedDocument<Anime>;

@Schema({ timestamps: true })
export class Anime {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  title_en: string;

  @Prop()
  desc: string;

  @Prop({ type: Array, default: [] })
  tags: [];

  @Prop()
  img: string;

  @Prop()
  banner: string;

  @Prop({ required: true, type: Number })
  episodeCount: number;

  @Prop({ default: 0, type: Number })
  rate: number;

  @Prop({ unique: true, required: true })
  slug: string;

  @Prop({ type: Object })
  stats: {
    watching: number;
    completed: number;
    planned: number;
    dropped: number;
  };

  @Prop({
    type: [
      {
        title: { type: String, default: "Brak tytułu" },
        desc: { type: String },
        img: { type: String },
        number: { type: Number },
        sources: [
          {
            group: { type: String },
          },
        ],
      },
    ],
    default: [],
  })
  episodes: {
    number: number;
    title: string;
    img: string;
    desc: string;
    sources?: {
      name: string;
      link: string;
      uploader: string;
      group: string;
    }[];
  }[];

  @Prop({ type: [Types.ObjectId], default: [], ref: "Review" })
  reviews: Types.ObjectId[];
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);
