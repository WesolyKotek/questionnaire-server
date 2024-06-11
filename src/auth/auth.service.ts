import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!bcrypt.compareSync(pass, user.password)) {
      throw new UnauthorizedException(`Password is incorrect`);
    }
    const payload = {
      id: user.id,
      email: user.email,
      faculty: user.facultyDepartment,
      isAdmin: user.admin,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
