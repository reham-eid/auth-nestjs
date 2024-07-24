import { PickType } from "@nestjs/mapped-types";
import { baseUserDto } from "../../user/dtos/user.dto";

export class signInUserDto extends PickType(baseUserDto, [
  "email",
  "password",
] as const) {}
