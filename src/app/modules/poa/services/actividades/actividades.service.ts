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
    let consulta = {_id: idProyecto};
    return this.http.post<[]>(this.baseUrl + '/poa/actividadesPorProyecto' , consulta);
  };

  etapasPorProyecto(idProyecto):Observable<[]>{
    let consulta = {_id: idProyecto};
    return this.http.post<[]>(this.baseUrl + '/poa/etapasPorProyecto' , consulta);
  };

  actividadesPorEtapa(idEtapa):Observable<[]>{
    let consulta = {_id: idEtapa};
    return this.http.post<[]>(this.baseUrl + '/poa/actividadesPorEtapa' , consulta);
  };

  getActividad(idActividad):Observable<{}>{
    return this.http.get<{}>(this.baseUrl + '/poa/actividades/' + idActividad);
  }

  guardarActividad(actividad):Observable<{}>{
    return this.http.post<{}>(this.baseUrl + '/poa/actualizarActividad', actividad);
  }

  guardarEtapa(etapa):Observable<{}>{
    return this.http.post<{}>(this.baseUrl + '/poa/guardarEtapa', etapa)
  }
}
