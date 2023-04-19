import { Types } from "mongoose";
export interface Episode {
    number: number;
    title: string;
    desc: string;
    img: string;
    sources: [
        {
            name: string;
            link: string;
            uploader: string;
            group: Types.ObjectId;
        }
    ];
}
