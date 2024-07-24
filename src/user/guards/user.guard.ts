import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/role.decorator";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private reflector: Reflector , private jwtService:JwtService) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());
    console.log("roles>> ", roles);
    if (!roles) {
      return true;
    }
    // get token
    const req = context.switchToHttp().getRequest();
    const token = (req.headers.auth || ' ').split(" ", 2)[1];
    console.log("token>>  ",token);
    
    if (!token) {
      throw new UnauthorizedException();
    }


  }
}
