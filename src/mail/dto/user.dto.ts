import { IsEmail, IsString } from "class-validator";

export class UserSuscriptionDTO{
  @IsEmail()
  email: string;
  @IsString()
  name: string;
}