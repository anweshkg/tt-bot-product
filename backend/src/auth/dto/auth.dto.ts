import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsEnum,
  IsDateString,
  Length,
} from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString() // @IsStrongPassword() use later
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  lastname: string;

  @IsNotEmpty()
  @IsEnum(['male', 'female'])
  gender: 'male' | 'female';

  @IsNotEmpty()
  @IsDateString()
  dob: string;
}
