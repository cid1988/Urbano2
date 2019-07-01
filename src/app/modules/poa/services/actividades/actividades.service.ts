import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  url = "http://localhost:3000/api/poa/";

  constructor(private http:HttpClient) { }

  actividadesPorProyecto(idProyecto):Observable<[]>{
    return this.http.post<[]>('http://localhost:3000/api/poa/actividadesPorProyecto' , idProyecto);
  };

  etapasPorProyecto(idProyecto):Observable<[]>{
    return this.http.post<[]>('http://localhost:3000/api/poa/etapasPorProyecto' , idProyecto);
  };

  actividadesPorEtapa(idEtapa):Observable<[]>{
    let consulta = {_id: idEtapa}
    return this.http.post<[]>('http://localhost:3000/api/poa/actividadesPorEtapa' , consulta);
  };

  getActividad(idActividad):Observable<{}>{
    return this.http.get<{}>('http://localhost:3000/api/poa/actividades/' + idActividad)
  }
}
