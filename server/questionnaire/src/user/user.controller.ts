import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { UserProfileGuard } from './user.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('/users')
export class UserContoller {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserProfileGuard)
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createUser(@Body() createUser: CreateUser) {
    return this.userService.create(createUser);
  }

  @UseGuards(UserProfileGuard)
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUser,
  ) {
    return this.userService.update(id, updateUser);
  }

  @UseGuards(UserProfileGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
