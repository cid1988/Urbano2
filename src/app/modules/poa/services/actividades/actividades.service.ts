import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  baseUrl = environment.baseUrl

  constructor(private http:HttpClient) { }

  actividadesPorProyecto(idProyecto):Observable<[]>{
    return this.http.post<[]>(this.baseUrl + '/poa/actividadesPorProyecto' , idProyecto);
  };

  etapasPorProyecto(idProyecto):Observable<[]>{
    return this.http.post<[]>(this.baseUrl + '/poa/etapasPorProyecto' , idProyecto);
  };

  actividadesPorEtapa(idEtapa):Observable<[]>{
    let consulta = {_id: idEtapa}
    return this.http.post<[]>(this.baseUrl + '/poa/actividadesPorEtapa' , consulta);
  };

  getActividad(idActividad):Observable<{}>{
    return this.http.get<{}>(this.baseUrl + '/poa/actividades/' + idActividad)
  }
}
