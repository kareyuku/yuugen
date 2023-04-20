import { Types } from "mongoose";
export declare class CreateGroupDto {
    owner: string | Types.ObjectId;
    name: string;
    img: string;
}
