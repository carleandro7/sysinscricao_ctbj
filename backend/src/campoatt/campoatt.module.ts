import { Module } from '@nestjs/common';
import { CampoattService } from './campoatt.service';
import { CampoattController } from './campoatt.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CampoattController],
  providers: [CampoattService],
  imports: [PrismaModule]
})
export class CampoattModule {}
