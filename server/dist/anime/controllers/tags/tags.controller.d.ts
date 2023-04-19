import { TagsService } from "src/anime/services/tags/tags.service";
import { Tag } from "src/schemas/tag.schema";
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    createTag(tag: string): Promise<Object>;
    getTags(): Promise<Promise<Tag>[]>;
}
