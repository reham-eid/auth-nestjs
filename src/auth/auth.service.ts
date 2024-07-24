import { JwtService } from "@nestjs/jwt";
import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "src/user/interfaces/user.interface";
import { signInUserDto } from "./dtos/user.signIn.dto";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { signUpUserDto } from "./dtos/signUp.dto";
import { Token } from "src/common/types/tokens";

@Injectable()
export class AuthService {
  constructor(
    @Inject("USER_MODEL")
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  hashData(data: string) {
    const salt = genSaltSync(10);
    return hashSync(data, salt);
  }

  async signUp(
    body: signUpUserDto,
  ): Promise<{ data: User; Tokens: Token }> {
    const { email, password, userName } = body;
    const isUser = await this.userModel.findOne({ email });
    if (isUser) {
      throw new ConflictException("User with this email already exists");
    }

    const hashed = this.hashData(password);
    const userData = {
      userName,
      email,
      password: hashed,
      role: "user",
    };
    const user = await this.userModel.create({
      userData,
    });
    // generate Token
    const payload = { sub: user._id, username: user.userName };

    const accessToken = await this.jwtService.sign(payload,{
      expiresIn: "60m",secret: process.env.SECRET_JWT
    });
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: "7d",secret: process.env.SECRET_JWT
    });  

    return {
      data: user,
      Tokens: { accessToken, refreshToken },
    };
  }

  async signIn(body: signInUserDto): Promise<User> {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }

    const comparePassword = compareSync(password, user.password);
    if (!comparePassword) {
      throw new ForbiddenException({ description: " uncorrect password" });
    }
    return user;
  }

  sginOut() {}

  refreshToken() {}
}
