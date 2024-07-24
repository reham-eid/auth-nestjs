import { authProvider } from "./providers/database.providers";
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { DatabaseModule } from "src/database/database.module";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: "60m" },
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [...authProvider, AuthService],
})
export class AuthModule {}
