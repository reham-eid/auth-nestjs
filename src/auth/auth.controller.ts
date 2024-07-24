import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Roles } from "src/user/decorators/role.decorator";
import { signInUserDto } from "./dtos/user.signIn.dto";
import { signUpUserDto } from "./dtos/signUp.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService:AuthService){}

  @Post("create")
  @Roles(["admin", "user"])
  signUp(@Body() body:signUpUserDto) {
    return this.authService.signUp(body)
  }

  @Post("signIn")
  @Roles(["admin", "user"])
  signIn(@Body() body:signInUserDto) {
    return this.authService.signIn(body)
  }

  @Post("create")
  @Roles(["admin", "user"])
  sginOut() {}

  
  refreshToken() {}
}
