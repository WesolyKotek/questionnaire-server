import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  Logger,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { UserSexEnum } from './enums/user-sex.enum';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      this.logger.warn(`User with id ${id} not found`);
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`User with email ${email} not found`);
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(createUser: CreateUser): Promise<User> {
    const existingUser = await this.userModel.findOne({
      where: { email: createUser.email },
    });

    if (existingUser) {
      this.logger.warn(`User with email ${createUser.email} already exists`);
      throw new ConflictException(
        `User with email ${createUser.email} already exists`,
      );
    }

    if (!Object.values(UserSexEnum).includes(createUser.sex)) {
      throw new ForbiddenException('Invalid user sex');
    }

    const hashedPassword = bcrypt.hashSync(createUser.password, 10);

    const user = await this.userModel.create({
      ...createUser,
      password: hashedPassword,
    });
    return user;
  }

  async update(id: number, updateUser: UpdateUser): Promise<[number, User[]]> {
    const updateData = { ...updateUser };
    if (updateUser.password) {
      updateData.password = await bcrypt.hash(updateUser.password, 10);
    }

    const [affectedCount, affectedRows] = await this.userModel.update(
      { ...updateData },
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedCount === 0) {
      this.logger.warn(`User with id ${id} not found for update`);
      throw new NotFoundException(`User with id ${id} not found for update`);
    }

    return [affectedCount, affectedRows];
  }

  async updateLastLogin(id: number): Promise<[number]> {
    const [affectedCount] = await this.userModel.update(
      { lastlogin: new Date() },
      {
        where: { id },
      },
    );

    if (affectedCount === 0) {
      this.logger.warn(`User with id ${id} not found for updating last login`);
      throw new NotFoundException(
        `User with id ${id} not found for updating last login`,
      );
    }

    return [affectedCount];
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      this.logger.warn(`User with id ${id} not found for delete`);
      throw new NotFoundException(`User with id ${id} not found for delete`);
    }
    await user.destroy();
  }
}
