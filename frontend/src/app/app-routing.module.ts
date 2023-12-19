import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './component/cursos/cursos.component';
import { InstituicaoComponent } from './component/instituicao/instituicao.component';
import { ModulosComponent } from './component/modulos/modulos.component';
import { UsersComponent } from './component/users/users.component';


const routes: Routes = [
  { path: 'instituicao', component: InstituicaoComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'modulos', component: ModulosComponent },
  { path: 'users', component: UsersComponent },
  // Adicione outras rotas conforme necessário
  { path: '', redirectTo: '/instituicao', pathMatch: 'full' }, // Rota padrão
  { path: '**', redirectTo: '/instituicao', pathMatch: 'full' }, // Rota padrão para qualquer caminho inválido
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
