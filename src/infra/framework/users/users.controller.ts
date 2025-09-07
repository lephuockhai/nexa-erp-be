import { ChangePasswordDto } from '@/shared/dtos/users/change-password.dto';
import { CreateUserDto } from '@/shared/dtos/users/create-user.dto';
import { UpdateUserDto } from '@/shared/dtos/users/update-user.dto';
import { ChangePasswordUseCase } from '@/use-cases/users/change-password';
import { CreateUserUseCase } from '@/use-cases/users/create-user';
import { DeletedUserUseCase } from '@/use-cases/users/delete-user';
import { FindAllUsersUseCase } from '@/use-cases/users/find-all-users';
import { FindByIdUseCase } from '@/use-cases/users/find-by-id';
import { UpdateUserUseCase } from '@/use-cases/users/udapte-user';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findAllUsersUseCase: FindAllUsersUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deletedUserUseCase: DeletedUserUseCase,
    private findByIdUseCase: FindByIdUseCase,
    private changedPassword: ChangePasswordUseCase,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.createUserUseCase.execute(data);
  }

  @Get()
  async findAll() {
    return this.findAllUsersUseCase.execute();
  }

  @Patch()
  async update(@Body() data: UpdateUserDto) {
    return this.updateUserUseCase.execute(data);
  }

  @Patch('/change-password')
  async changePassword(@Body() data: ChangePasswordDto) {
    return this.changedPassword.execute(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deletedUserUseCase.execute(id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.findByIdUseCase.execute(id);
  }
}
