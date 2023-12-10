import { Module } from '@nestjs/common';
import { ListselectService } from './listselect.service';
import { ListselectController } from './listselect.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ListselectController],
  providers: [ListselectService],
  imports: [PrismaModule]
})
export class ListselectModule {}
