import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
