import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http:HttpClient) { }

  actividadesPorProyecto(proyecto):Observable<{}>{
    return this.http.post<[]>('http://localhost:3000/api/poa/actividades' , proyecto);
  };
}
