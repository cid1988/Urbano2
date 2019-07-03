import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Reunion } from '../models/reunion';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http: HttpClient) { }

  getReuniones():Observable<Reunion[]>{
    return this.http.get<Reunion[]>('http://localhost:3000/api/rdg/reuniones');
  };

  getSeriesDeReunion():Observable<{}>{
    return this.http.get<{}>('http://localhost:3000/api/rdg/series');
  }

  getMaestroPorReunion(idReunion):Observable<{}>{
    return this.http.get<{}>('http://localhost:3000/api/rdg/maestroPorReunion/' + idReunion);
  }
}
