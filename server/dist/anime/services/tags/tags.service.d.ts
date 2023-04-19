import { Model } from "mongoose";
import { Tag } from "src/schemas/tag.schema";
export declare class TagsService {
    private tagModel;
    constructor(tagModel: Model<Tag>);
    createTag(tagName: string): Promise<Tag>;
    getAllTags(): Promise<Promise<Tag>[]>;
}
