import { OmitType } from "@nestjs/mapped-types";
import { baseUserDto } from "../../user/dtos/user.dto";

export class signUpUserDto extends OmitType(baseUserDto, ["id"] as const) {}
