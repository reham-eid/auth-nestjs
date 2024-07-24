import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy , ExtractJwt} from 'passport-jwt';

@Injectable()
export class AccessToken extends PassportStrategy(Strategy, 'access-jwt') {
  constructor() {
    super({
      jwtFormRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey : 'at'
    });
  }

  validate(payload:any){
    return payload
  }
}
