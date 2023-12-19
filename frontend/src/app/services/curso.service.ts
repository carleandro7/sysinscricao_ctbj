
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoModel } from '../module/curso-model';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends AppService{

  
  public objectList(): Observable<CursoModel[]>{
    return this.http.get<CursoModel[]>(`${this.url}cursos`)
    .pipe(
      res => res,
      error => error   
    )
  }

  public getList(page: number, pageSize: number, nomePesquisa: string): Observable<any[]> {
    const url_aux = `${this.url}cursos?nome=${nomePesquisa}&page=${page}&pageSize=${pageSize}`;
    return this.http.get<CursoModel[]>(url_aux);
  }

  public objectAdd(value: []): Observable<CursoModel>{
    return this.http.post<CursoModel>(`${this.url}cursos`, value)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectEdit(id: number, value: []): Observable<CursoModel>{
    return this.http.patch<CursoModel>(`${this.url}cursos/${id}`, value)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectVisualizar(id: number): Observable<CursoModel>{
    return this.http.get<CursoModel>(`${this.url}cursos/${id}`)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectDelete(id: number): Observable<CursoModel>{
    return this.http.delete<CursoModel>(`${this.url}cursos/${id}`)
    .pipe(
      res => res,
      error => error   
    )
  }
}
