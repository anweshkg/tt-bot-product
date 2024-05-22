import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { UserRepository } from 'src/typeorm/repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,

    private jwtService: JwtService,
  ) {}

  async signUpLocal(body: AuthDto): Promise<Tokens> {
    const hash = await this.hash(body.password);

    const newUser = this.userRepository.create({
      emailAddress: body.email,
      passwordHash: hash,
    });
    const user = await this.userRepository.save(newUser);
    const tokens = await this.signTokens(user.userId, user.emailAddress);
    await this.rtHashData(user.userId, tokens.refreshtoken);
    return tokens;
  }

  async signInLocal() {}
  async logout() {}
  async refreshToken() {}

  async rtHashData(userId: number, rt: string) {
    const hash = await this.hash(rt);
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    if (user) user.hashedRt = hash;
    this.userRepository.save(user);
  }

  async hash(data: string) {
    return bcrypt.hash(data, 10);
  }

  async signTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.sign(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 15, //15 mins
          secret: 'at-secret',
        },
      ),
      this.jwtService.sign(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 60 * 24 * 7, //1 week
          secret: 'rt-secret',
        },
      ),
    ]);

    return { accesstoken: at, refreshtoken: rt };
  }
}
