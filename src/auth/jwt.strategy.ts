import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config/config';
import { UserService } from 'src/user/user.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envs.secret_key,
    });
  }

  async validate(payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken();
    if (this.userService.hasBlackList(token)) {
      throw new UnauthorizedException('Token is blacklisted');
    }

    return {
      userId: payload.id,
      username: payload.username,
      role: payload.role,     
    };
  }
}
