import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { Tokens } from './types';
import { RtGaurd } from 'src/common/gaurds';
import { GetCurrentUserId, GetReqValue, Public } from 'src/common/decoraters';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUpLocal(@Body() body: AuthDto): Promise<Tokens> {
    return await this.authService.signUpLocal(body);
  }

  @Public()
  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  async logInLocal(@Body() body: LoginDto): Promise<any> {
    return await this.authService.logInLocal(body);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGaurd)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @GetCurrentUserId() userId: number,
    @GetReqValue('refreshtoken') refreshtoken: string,
  ) {
    // const user = req.user;
    console.log(refreshtoken);
    return this.authService.refreshToken(userId, refreshtoken);
  }
}
