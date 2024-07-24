import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class baseUserDto {
  @IsNotEmpty({ message: "user name is required" })
  @IsString({ message: "user name must be string" })
  userName: string;

  @IsNotEmpty({ message: "password is required" })
  @IsString({ message: "password must be string" })
  password: string;

  @IsNotEmpty({ message: "email is required" })
  @IsString({ message: "email of user must be string" })
  email: string;

  @IsNotEmpty({ message: "id is required" })
  @IsString({ message: "id of user must be string" })
  id: string;

  @IsNotEmpty({ message: "role is required" })
  @IsEnum(["user", "admin"], { message: "role user must be admin or user" })
  role: string;
}
