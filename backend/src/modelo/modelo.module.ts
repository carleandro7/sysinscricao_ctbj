import { Module } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ModeloController],
  providers: [ModeloService],
  imports: [PrismaModule]
})
export class ModeloModule {}
