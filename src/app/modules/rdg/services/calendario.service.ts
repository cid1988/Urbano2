import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Reunion } from '../models/reunion';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl

  getReuniones():Observable<Reunion[]>{
    return this.http.get<Reunion[]>(this.baseUrl + '/rdg/reuniones');
  };

  getTiposReunion():Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/rdg/tipos');
  };

  getSeriesDeReunion():Observable<{}>{
    return this.http.get<{}>(this.baseUrl + '/rdg/series');
  }

  getMaestroPorReunion(idReunion):Observable<{}>{
    return this.http.get<{}>(this.baseUrl + '/rdg/maestroPorReunion/' + idReunion);
  }

  guardarNuevaReunion(reunion):Observable<{}>{
    return this.http.post<{}>(this.baseUrl + '/rdg/nuevaReunion', reunion);
  }

  actualizarReunion(reunion):Observable<{}>{
    return this.http.post<{}>(this.baseUrl + '/rdg/actualizarReunion', reunion);
  }
}
