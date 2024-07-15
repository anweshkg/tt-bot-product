import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, LoginDto } from './dto';
import { UserRepository } from 'src/typeorm/repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { IsNull, Not } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,

    private jwtService: JwtService,
  ) {}

  async signUpLocal(body: AuthDto): Promise<Tokens> {
    const hash = await this.hash(body.password);
    const full_name = body.firstname + ' ' + body.lastname;

    const newUser = this.userRepository.create({
      emailAddress: body.email,
      passwordHash: hash,
      fullName: full_name,
      gender: body.gender,
      uuid: uuidv4(),
      dob: body.dob,
    });
    const user = await this.userRepository.save(newUser);
    const tokens = await this.getTokens(user.userId, user.emailAddress);
    await this.updateRtHashData(user.userId, tokens.refreshtoken);
    return tokens;
  }

  async logInLocal(body: LoginDto) {
    console.log('body', body);
    const user = await this.userRepository.findOne({
      where: {
        emailAddress: body.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const password_matches = await bcrypt.compare(
      body.password,
      user.passwordHash,
    );
    if (!password_matches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.userId, user.emailAddress);
    await this.updateRtHashData(user.userId, tokens.refreshtoken);
    console.log('----------', tokens);
    const res = {
      user: user,
      tokens,
    };
    return res;
  }

  async logout(userId: number) {
    await this.userRepository.update(
      { userId: userId, hashedRt: Not(IsNull()) }, //hashedRt: Not(IsNull()) reduces DB calls
      { hashedRt: null },
    );
  }

  async refreshToken(userId: number, rt: string) {
    const user = await this.userRepository.findOne({
      where: {
        userId: userId,
      },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rt_matches = await bcrypt.compare(rt, user.hashedRt);
    if (!rt_matches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.userId, user.emailAddress);
    await this.updateRtHashData(user.userId, tokens.refreshtoken);

    return tokens;
  }

  async updateRtHashData(userId: number, rt: string) {
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

  async getTokens(userId: number, email: string): Promise<Tokens> {
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
