import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObrasService {

  constructor(private http:HttpClient) { }

  actividadesPorProyecto(proyecto):Observable<{}>{
    return this.http.post<[]>('http://localhost:3000/api/poa/obras' , proyecto);
  };
}
