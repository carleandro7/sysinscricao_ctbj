import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { InstituicaoModule } from './instituicao/instituicao.module';
import { UserModule } from './user/user.module';
import { ModuloModule } from './modulo/modulo.module';
import { CursoModule } from './curso/curso.module';
import { SelecaomodeloModule } from './selecaomodelo/selecaomodelo.module';
import { ModeloModule } from './modelo/modelo.module';
import { CampoattModule } from './campoatt/campoatt.module';
import { ListselectModule } from './listselect/listselect.module';


@Module({
  imports: [PrismaModule, InstituicaoModule, UserModule, ModuloModule, CursoModule,  SelecaomodeloModule, ModeloModule, CampoattModule, ListselectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
