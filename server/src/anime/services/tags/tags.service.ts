import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tag } from "src/schemas/tag.schema";

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async createTag(tagName: string): Promise<Tag> {
    const tag = new this.tagModel({ name: tagName });

    try {
      await tag.save();
      return tag;
    } catch (err) {
      if (err.keyValue.name)
        throw new ConflictException("Tag o takiej nazwie już istnieje.");
    }
  }

  async getAllTags(): Promise<Promise<Tag>[]> {
    return await this.tagModel.find();
  }
}
