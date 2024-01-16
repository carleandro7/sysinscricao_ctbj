import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppService } from './app.service';
import { SelecaomodeloModulo } from '../module/selecaomodelo-modulo';
@Injectable({
  providedIn: 'root'
})
export class SelecaomodeloService extends AppService{

  public objectList(): Observable<SelecaomodeloModulo[]>{
    return this.http.get<SelecaomodeloModulo[]>(`${this.url}selecaomodelos`)
    .pipe(
      res => res,
      error => error   
    )
  }

  public getList(page: number, pageSize: number, nomePesquisa: string): Observable<any[]> {
    const url_aux = `${this.url}selecaomodelos?descricao=${nomePesquisa}&page=${page}&pageSize=${pageSize}`;
    return this.http.get<SelecaomodeloModulo[]>(url_aux);
  }

  public objectAdd(value: []): Observable<SelecaomodeloModulo>{
    return this.http.post<SelecaomodeloModulo>(`${this.url}selecaomodelos`, value)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectEdit(id: number, value: []): Observable<SelecaomodeloModulo>{
    return this.http.patch<SelecaomodeloModulo>(`${this.url}selecaomodelos/${id}`, value)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectVisualizar(id: number): Observable<SelecaomodeloModulo>{
    return this.http.get<SelecaomodeloModulo>(`${this.url}selecaomodelos/${id}`)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectDelete(id: number): Observable<SelecaomodeloModulo>{
    return this.http.delete<SelecaomodeloModulo>(`${this.url}selecaomodelos/${id}`)
    .pipe(
      res => res,
      error => error   
    )
  }
}
