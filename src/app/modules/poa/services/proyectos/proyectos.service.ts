import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../../models/proyecto';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  getAreas():Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/poa/areas');
  }

  getProyectoPorId(idProyecto):Observable<Proyecto>{
    return this.http.get<Proyecto>(this.baseUrl + '/poa/proyectos/' + idProyecto);
  }

  getAreasPorPlan(idPlan):Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/poa/areas?idPlan=' + idPlan);
  };

  proyectosPorPlan(plan,area):Observable<Proyecto[]>{//Es necesario pasar el plan?
    return this.http.get<Proyecto[]>(this.baseUrl + '/poa/proyectos?idJurisdiccion=' + area._id)
  };

  etapasPorProyecto(idProyecto):Observable<[]>{
    let consulta = {id: idProyecto};
    return this.http.post<[]>(this.baseUrl + '/poa/etapasPorProyecto' , consulta);
  };

  getProyectosHijos(idProyecto,anio):Observable<[]>{
    let consulta = {idProyecto: idProyecto, anio: anio}
    return this.http.post<[]>(this.baseUrl + '/poa/proyectosHijos', consulta);
  }

  actualizarProyecto(proyecto):Observable<{}>{
    return this.http.put<{}>(this.baseUrl + '/poa/proyectos/' + proyecto._id, proyecto);
  }

  crearPlan(plan){
    return this.http.post<{}>(this.baseUrl + '/poa/planes/crear', plan);
  }

  crearAreas(arrayAreas):Observable<[]>{
    return this.http.post<[]>(this.baseUrl + '/poa/areas/crear', arrayAreas);
  }

  crearProyecto(proyecto):Observable<{}>{
    return this.http.post<{}>(this.baseUrl + '/poa/proyectos', proyecto);
  }
}