import { NgModule } from '@angular/core';
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

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    MenubarComponent,
    InstituicaoComponent,
    ConfirmDialogComponent,
    SuccessDialogComponent
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
