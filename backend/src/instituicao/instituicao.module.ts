import { Module } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { InstituicaoController } from './instituicao.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [InstituicaoController],
  providers: [InstituicaoService],
  imports: [PrismaModule],
})
export class InstituicaoModule {}
