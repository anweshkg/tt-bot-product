import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt-secret',
      passReqToCallback:true,
    });
  }

  validate(req: Request, payload: any){
    const refreshtoken= req.get('authorization').replace('Bearer', '').trim();
    return {...payload,refreshtoken};
  };
}
