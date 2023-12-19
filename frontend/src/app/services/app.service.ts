import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AppModel } from '../module/app-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AppService {
  public url: string = "http://localhost:3000/";
  public emitEvent = new EventEmitter();
  constructor(protected http: HttpClient) { }

  
  public abstract objectList(): Observable<AppModel[]>;

  public abstract getList(page: number, pageSize: number, nomePesquisa: string): Observable<any[]>;

  public abstract objectAdd(value: []): Observable<AppModel>;

  public abstract objectEdit(id: number, value: []): Observable<AppModel>;

  public abstract objectVisualizar(id: number): Observable<AppModel>;

  public abstract objectDelete(id: number): Observable<AppModel>;
}
