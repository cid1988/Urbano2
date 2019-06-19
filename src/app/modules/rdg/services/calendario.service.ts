import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http: HttpClient) { }

  getReuniones():Observable<{}>{
    return this.http.get<[]>('http://localhost:3000/api/rdg.reuniones');
  };
}
