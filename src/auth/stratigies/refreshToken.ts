import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy , ExtractJwt} from 'passport-jwt';

@Injectable()
export class RefreshToken extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor() {
    super({
      jwtFormRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey : 'rt',
      passReqToCallback:true
    });
  }

  validate( req:Request ,payload:any){
    const refreshToken = req.get('auth').replace('Bearer','').trim()
    return {...payload , refreshToken}
  }
}
