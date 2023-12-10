import { Module } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { ModuloController } from './modulo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ModuloController],
  providers: [ModuloService],
  imports: [PrismaModule],
})
export class ModuloModule {}
