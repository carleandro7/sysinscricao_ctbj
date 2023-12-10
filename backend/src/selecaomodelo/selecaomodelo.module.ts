import { Module } from '@nestjs/common';
import { SelecaomodeloService } from './selecaomodelo.service';
import { SelecaomodeloController } from './selecaomodelo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SelecaomodeloController],
  providers: [SelecaomodeloService],
  imports: [PrismaModule]
})
export class SelecaomodeloModule {}
