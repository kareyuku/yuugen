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
  /*
  @Prop({ type: Object })
  stats: {
    watching: number;
    completed: number;
    planned: number;
    dropped: number;
  };*/

  @Transform(({ value }) => {
    value = value.map((episode) => {
      if (episode.sources)
        episode.sources = episode.sources.map((source) => {
          if (source.uploader) source.uploader = source.uploader.toString();
          if (source.group) source.group = source.group.toString();
          return source;
        });
      return episode;
    });

    return value;
  })
  @Prop({
    type: [
      {
        title: { type: String, default: "Brak tytułu" },
        desc: { type: String },
        img: { type: String },
        number: { type: Number },
        sources: [
          {
            name: { type: String },
            link: { type: String },
            uploader: { type: Types.ObjectId, ref: "User" },
            //group: { type: Types.ObjectId, ref: "Group" },
            group: {type: String},
            _id: false,
          },
        ],
      },
    ],
    default: [],
    _id: false,
  })
  episodes: {
    number: number;
    title: string;
    img: string;
    desc: string;
    sources: {
      name: string;
      link: string;
      uploader: Types.ObjectId;
      group: string;
      //group: Types.ObjectId;
    }[];
  }[];

  @Prop({ type: [Types.ObjectId], default: [], ref: "Review" })
  reviews: Types.ObjectId[];
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);
