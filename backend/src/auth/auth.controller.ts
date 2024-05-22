import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/signup')
  async signUpLocal(@Body() body:AuthDto):Promise<Tokens>{
    return await this.authService.signUpLocal(body);
  }

  @Post('local/signin')
  async signInLocal(){
    return this.authService.signInLocal();
  }

  @Post('logout')
  async logout(){
    return this.authService.logout()
  }
  
  @Post('refresh')
  async refreshToken(){
    return this.authService.refreshToken()
  }
}
