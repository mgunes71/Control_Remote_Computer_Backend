import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcryptjs"
import { UserEntity } from "../../../models/user.entity";

@Injectable()
export class AuthenticationService {
  constructor(private jwtService: JwtService) {
  }

  async login(loginDto: {email: string, password: string}) {
    const [err,user] = await UserEntity.scope('withPassword').findOne({
      where: {
        email: loginDto.email,
      }
    }).toArray();

    if (!user) {
      throw new BadRequestException('The credentials you entered are not correct');
    }

    const [errCompare,comparePassword] = await bcrypt.compare(loginDto.password, user.password).toArray();

    if (errCompare) {
      throw errCompare;
    }

    if (!comparePassword) {
      throw new BadRequestException('The credentials you entered are not correct')
    }

    const jwtPayload = { id: user.id };
    const token = this.jwtService.sign(jwtPayload);

    return {
      token:`Bearer ${token}`,
    }
  }

  async register(registerDto: {email: string, password: string}) {
    const user = await UserEntity.findOne({
      where: {
        email: registerDto.email
      }
    });

    if (user) {
      throw new BadRequestException("user already exist");
    }

    const [err,salt] = await bcrypt.genSalt(10).toArray();

    if (err) {
      throw err;
    }

    const [errHash,hashedPassword] = await bcrypt.hash(registerDto.password, salt).toArray();

    if (errHash) {
      throw err;
    }

    const registeredUser = await UserEntity.create(
      {
        email: registerDto.email,
        password: hashedPassword,
      }
    );

    const jwtPayload = { id: registeredUser.id };
    const token = await this.jwtService.sign(jwtPayload);


    return {
      token: `Bearer ${token}`
    };
  }

  async verifyToken(jwtToken: string) {
    const payload = await this.jwtService.verify(jwtToken);
    return payload;
  }
}
