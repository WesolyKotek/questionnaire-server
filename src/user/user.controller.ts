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
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('/users')
export class UserContoller {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получить пользователя по его ID.' })
  @ApiNotFoundResponse({
    description: 'User with id ${id} not found',
  })
  @ApiBearerAuth()
  @UseGuards(UserProfileGuard)
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Создать нового пользователя.' })
  @ApiForbiddenResponse({
    description: 'Invalid user sex',
  })
  @ApiConflictResponse({
    description: 'User with email ${createUser.email} already exists',
  })
  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createUser(@Body() createUser: CreateUser) {
    return this.userService.create(createUser);
  }

  @ApiOperation({ summary: 'Обновить данные существующего пользователя.' })
  @ApiNotFoundResponse({
    description: 'User with id ${id} not found for update',
  })
  @ApiBearerAuth()
  @UseGuards(UserProfileGuard)
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUser,
  ) {
    return this.userService.update(id, updateUser);
  }

  @ApiOperation({ summary: 'Удалить пользователя.' })
  @ApiNotFoundResponse({
    description: 'User with id ${id} not found for delete',
  })
  @ApiBearerAuth()
  @UseGuards(UserProfileGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
