import { updateUserDto } from "./dtos/update.user.dto";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { createUserDto } from "./dtos/create.user.dto";
import { Model } from "mongoose";
import { User } from "./interfaces/user.interface";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_MODEL")
    private userModel: Model<User>,
  ) {}

  async createUserService(body: createUserDto): Promise<User> {
    console.log("Body>> ", body);
    const user = await this.userModel.create(body);
    return user;
  }

  async findAll(): Promise<{ data: User[]; count: number; status: string }> {
    const users = await this.userModel.find();
    return { data: users, count: users.length, status: "success" };
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async updateById(id: string, updateDto: updateUserDto): Promise<User> {
    const newUser = await this.userModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    if (!newUser) {
      throw new NotFoundException()
    }
    return newUser
  }

  async deleteById(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException()
    }
    return deletedUser
  }
}
