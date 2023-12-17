import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstituicaoModel } from '../module/instituicao-model';


@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  private url: string = "http://localhost:3000/";
  public emitEvent = new EventEmitter();
  constructor(private http: HttpClient) { }

  public instituicaoList(): Observable<InstituicaoModel[]>{
    return this.http.get<InstituicaoModel[]>(`${this.url}instituicoes`)
    .pipe(
      res => res,
      error => error   
    )
  }

  public getInsituicao(page: number, pageSize: number): Observable<any[]> {
    const url_aux = `${this.url}instituicoes?page=${page}&pageSize=${pageSize}`;
    return this.http.get<InstituicaoModel[]>(url_aux);
  }

  public instituicaoAdd(value: string): Observable<InstituicaoModel>{
    return this.http.post<InstituicaoModel>(`${this.url}instituicoes`, {nome: value})
    .pipe(
      res => res,
      error => error   
    )
  }

  public instituicaoEdit(id: number, value: string): Observable<InstituicaoModel>{
    return this.http.patch<InstituicaoModel>(`${this.url}instituicoes/${id}`, {nome: value})
    .pipe(
      res => res,
      error => error   
    )
  }

  public instituicaoVisualizar(id: number): Observable<InstituicaoModel>{
    return this.http.get<InstituicaoModel>(`${this.url}instituicoes/${id}`)
    .pipe(
      res => res,
      error => error   
    )
  }

  public instituicaoDelete(id: number): Observable<InstituicaoModel>{
    return this.http.delete<InstituicaoModel>(`${this.url}instituicoes/${id}`)
    .pipe(
      res => res,
      error => error   
    )
  }
}
