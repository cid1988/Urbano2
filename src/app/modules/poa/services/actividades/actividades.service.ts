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
    return this.http.get<[]>(this.baseUrl + '/poa/actividades?idProyecto=' + idProyecto);
  };

  actividadesPorEtapa(idEtapa):Observable<[]>{
    let consulta = {_id: idEtapa};
    return this.http.post<[]>(this.baseUrl + '/poa/actividadesPorEtapa' , consulta);
  };

  getActividad(idActividad):Observable<{}>{
    return this.http.get<{}>(this.baseUrl + '/poa/actividades/' + idActividad);
  }

  crearActividad(actividad):Observable<{}>{
    return this.http.post<{}>(this.baseUrl + '/poa/actividades', actividad);
  }

  guardarActividad(actividad):Observable<{}>{
    return this.http.put<{}>(this.baseUrl + '/poa/actividades/' + actividad._id, actividad);
  }
  
  crearEtapa(etapa):Observable<{}>{
    return this.http.post<{}>(this.baseUrl + '/poa/etapas/', etapa);
  }

  editarEtapa(etapa):Observable<{}>{
    return this.http.put<{}>(this.baseUrl + '/poa/etapas/' + etapa._id, etapa);
  }
}
