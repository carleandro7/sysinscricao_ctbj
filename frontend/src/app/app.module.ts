import { NgModule, LOCALE_ID  } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarComponent } from './component/menubar/menubar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { InstituicaoComponent } from './component/instituicao/instituicao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './component/util/confirm-dialog/confirm-dialog.component';
import { SuccessDialogComponent } from './component/util/success-dialog/success-dialog.component';
import { CursosComponent } from './component/cursos/cursos.component';
import { DbgridComponent } from './component/util/dbgrid/dbgrid.component';
import { ModulosComponent } from './component/modulos/modulos.component';
import { UsersComponent } from './component/users/users.component';
import { SelecaomodelosComponent } from './component/selecaomodelos/selecaomodelos.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    MenubarComponent,
    InstituicaoComponent,
    CursosComponent,
    ConfirmDialogComponent,
    SuccessDialogComponent,
    DbgridComponent,
    ModulosComponent,
    UsersComponent,
    SelecaomodelosComponent,
  ],
  
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }, // Idioma brasileiro
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // Formato de data brasileiro
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
