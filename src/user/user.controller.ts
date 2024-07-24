import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "./decorators/role.decorator";
import { UserService } from "./user.service";
import { createUserDto } from "./dtos/create.user.dto";
import { updateUserDto } from "./dtos/update.user.dto";
import { UserGuard } from "./guards/user.guard";

@Controller("api/user")
@UseGuards(UserGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post("create")
  @Roles(["admin", "user"])
  // @UseGuards(UserGuard)
  async createUser(@Body() body: createUserDto) {
    return this.userService.createUserService(body);
  }
  @Roles(["admin", "user"])
  @Get("all")
  async allUsers() {
    return this.userService.findAll();
  }

  @Roles(["admin", "user"])
  @Get("one/:id")
  async oneUser(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  @Roles(["admin", "user"])
  @Put("update/:id")
  async updateUser(@Param("id") id: string, @Body() body: updateUserDto) {
    return this.userService.updateById(id, body);
  }
  @Roles(['admin'])
  @Delete("delete/:id")
  async deleteUser(@Param("id") id: string) {
    return this.userService.deleteById(id);
  }
}
