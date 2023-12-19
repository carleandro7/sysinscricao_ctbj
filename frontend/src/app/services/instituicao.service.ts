import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstituicaoModel } from '../module/instituicao-model';
import { AppService } from './app.service';


@Injectable({
  providedIn: 'root'
})
export class InstituicaoService extends AppService{

  public objectList(): Observable<any[]>{
    const url_aux = `${this.url}instituicoes/all`;
    return this.http.get<InstituicaoModel[]>(url_aux);
  }

  public getList(page: number, pageSize: number, nomePesquisa: string): Observable<any[]> {
    const url_aux = `${this.url}instituicoes?nome=${nomePesquisa}&page=${page}&pageSize=${pageSize}`;
    return this.http.get<InstituicaoModel[]>(url_aux);
  }

  public objectAdd(value: []): Observable<InstituicaoModel>{
    return this.http.post<InstituicaoModel>(`${this.url}instituicoes`,  value)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectEdit(id: number, value: []): Observable<InstituicaoModel>{
    return this.http.patch<InstituicaoModel>(`${this.url}instituicoes/${id}`, value)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectVisualizar(id: number): Observable<InstituicaoModel>{
    return this.http.get<InstituicaoModel>(`${this.url}instituicoes/${id}`)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectDelete(id: number): Observable<InstituicaoModel>{
    return this.http.delete<InstituicaoModel>(`${this.url}instituicoes/${id}`)
    .pipe(
      res => res,
      error => error   
    )
  }
}
