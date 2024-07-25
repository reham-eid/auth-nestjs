import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { DatabaseModule } from "../database/database.module";
import { userProvider } from "./providers/user.provider";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: "60m" },
    }),
  ],
  controllers: [UserController],
  providers: [...userProvider, UserService],
  exports:[...userProvider]
})
export class UserModule {}
