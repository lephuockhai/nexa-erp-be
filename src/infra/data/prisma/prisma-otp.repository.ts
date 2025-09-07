import { OTPEntity } from '@/core/domain/entities/otp.entity';
import { OTPRepository } from '@/core/repositories/otp.repository';
import { PrismaService } from '@/infra/data/prisma/prisma.service';

export class PrismaOTPRepository implements OTPRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: OTPEntity): Promise<OTPEntity> {
    return this.prisma.otp.create({ data });
  }

  async findAll(filter?: Partial<OTPEntity>): Promise<OTPEntity[]> {
    return this.prisma.otp.findMany({ where: filter });
  }

  async findOne(filter: Partial<OTPEntity>): Promise<OTPEntity> {
    return this.prisma.otp.findFirst({
      where: filter,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, data: Partial<OTPEntity>): Promise<OTPEntity> {
    return this.prisma.otp.update({ where: { id }, data });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.otp.delete({ where: { id } });
  }
}
