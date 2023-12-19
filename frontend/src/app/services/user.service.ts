

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppService } from './app.service';
import { UserModel } from '../module/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AppService{

  
  public objectList(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.url}users`)
    .pipe(
      res => res,
      error => error   
    )
  }

  public getList(page: number, pageSize: number, nomePesquisa: string): Observable<any[]> {
    const url_aux = `${this.url}users?nome=${nomePesquisa}&page=${page}&pageSize=${pageSize}`;
    return this.http.get<UserModel[]>(url_aux);
  }

  public objectAdd(value: []): Observable<UserModel>{
    console.log(value)
    return this.http.post<UserModel>(`${this.url}users`, value)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectEdit(id: number, value: []): Observable<UserModel>{
    console.log(value)
    return this.http.patch<UserModel>(`${this.url}users/${id}`, value)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectVisualizar(id: number): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.url}users/${id}`)
    .pipe(
      res => res,
      error => error   
    )
  }

  public objectDelete(id: number): Observable<UserModel>{
    return this.http.delete<UserModel>(`${this.url}users/${id}`)
    .pipe(
      res => res,
      error => error   
    )
  }
}
