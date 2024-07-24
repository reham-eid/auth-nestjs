import { OmitType } from "@nestjs/mapped-types";
import { baseUserDto } from "./user.dto";

export class createUserDto extends OmitType(baseUserDto, ["id"] as const) {}
