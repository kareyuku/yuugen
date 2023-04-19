/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Date, HydratedDocument, Types } from "mongoose";
export type AnimeDocument = HydratedDocument<Anime>;
export declare class Anime {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    title: string;
    title_en: string;
    desc: string;
    tags: [];
    img: string;
    banner: string;
    episodeCount: number;
    rate: number;
    slug: string;
    stats: {
        watching: number;
        completed: number;
        planned: number;
        dropped: number;
    };
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
    reviews: Types.ObjectId[];
}
export declare const AnimeSchema: import("mongoose").Schema<Anime, import("mongoose").Model<Anime, any, any, any, import("mongoose").Document<unknown, any, Anime> & Omit<Anime & Required<{
    _id: Types.ObjectId;
}>, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Anime, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Anime>> & Omit<import("mongoose").FlatRecord<Anime> & Required<{
    _id: Types.ObjectId;
}>, never>>;
