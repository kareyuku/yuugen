import { Types } from "mongoose";
export declare class CreateGroupDto {
    name: string;
    img: string;
    owner: string | Types.ObjectId;
}
