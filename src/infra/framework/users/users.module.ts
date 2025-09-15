import { UsersRepository } from '@/core/repositories/users.repository';
import { PrismaUsersRepository } from '@/infra/data/prisma/prisma-users.repository';
import { PrismaService } from '@/infra/data/prisma/prisma.service';
import { CreateUserUseCase } from '@/use-cases/users/create-user';
import { FindAllUsersUseCase } from '@/use-cases/users/find-all-users';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UpdateUserUseCase } from '@/use-cases/users/udapte-user';
import { DeletedUserUseCase } from '@/use-cases/users/delete-user';
import { FindByIdUseCase } from '@/use-cases/users/find-by-id';
import { ChangePasswordUseCase } from '@/use-cases/users/change-password';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useFactory: (prisma: PrismaService) => new PrismaUsersRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repository: UsersRepository) =>
        new CreateUserUseCase(repository),
      inject: [UsersRepository],
    },
    {
      provide: FindAllUsersUseCase,
      useFactory: (repository: UsersRepository) =>
        new FindAllUsersUseCase(repository),
      inject: [UsersRepository],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (repository: UsersRepository) =>
        new UpdateUserUseCase(repository),
      inject: [UsersRepository],
    },
    {
      provide: DeletedUserUseCase,
      useFactory: (repository: UsersRepository) =>
        new DeletedUserUseCase(repository),
      inject: [UsersRepository],
    },
    {
      provide: FindByIdUseCase,
      useFactory: (repository: UsersRepository) =>
        new FindByIdUseCase(repository),
      inject: [UsersRepository],
    },
    {
      provide: ChangePasswordUseCase,
      useFactory: (repository: UsersRepository) =>
        new ChangePasswordUseCase(repository),
      inject: [UsersRepository],
    },
  ],
})
export class UsersModule {}
