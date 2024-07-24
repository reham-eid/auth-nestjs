import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { baseUserDto } from "./user.dto";

export class updateUserDto extends PartialType(baseUserDto) {
  @IsString()
  id;
}
