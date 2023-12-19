import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { ModuloModel } from '../module/modulo-model';

@Injectable({
  providedIn: 'root'
})
export class ModuloService extends AppService{

  public objectList(): Observable<ModuloModel[]>{
    return this.http.get<ModuloModel[]>(`${this.url}cursos`)
    .pipe(
      res => res,
      error => error   
    )
  }

  public getList(page: number, pageSize: number, nomePesquisa: string): Observable<any[]> {
    const url_aux = `${this.url}modulos?nome=${nomePesquisa}&page=${page}&pageSize=${pageSize}`;
    return this.http.get<ModuloModel[]>(url_aux);
  }

  public objectAdd(value: []): Observable<ModuloModel>{
    return this.http.post<ModuloModel>(`${this.url}modulos`, value)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectEdit(id: number, value: []): Observable<ModuloModel>{
    return this.http.patch<ModuloModel>(`${this.url}modulos/${id}`, value)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectVisualizar(id: number): Observable<ModuloModel>{
    return this.http.get<ModuloModel>(`${this.url}modulos/${id}`)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectDelete(id: number): Observable<ModuloModel>{
    return this.http.delete<ModuloModel>(`${this.url}modulos/${id}`)
    .pipe(
      res => res,
      error => error   
    )
  }
}
