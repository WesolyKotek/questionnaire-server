import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('/users')
export class UserContoller {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get()
  getByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createUser(@Body() createUser: CreateUser) {
    return this.userService.create(createUser);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUser: UpdateUser) {
    return this.userService.update(id, updateUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
