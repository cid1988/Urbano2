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

  getProyectoPorId(idProyecto):Observable<Proyecto>{
    let consulta = {_id: idProyecto}
    return this.http.post<Proyecto>(this.baseUrl + '/poa/proyecto', consulta);
  }
  getAreasPorPlan(plan):Observable<[]>{
    return this.http.post<[]>(this.baseUrl + '/poa/areas', plan);
  };

  proyectosPorPlan(plan,area):Observable<Proyecto[]>{
    let consulta = {idPlan: plan._id, idArea: area._id}
    return this.http.post<Proyecto[]>(this.baseUrl + '/poa/proyectos', consulta)
  };

  etapasPorProyecto(proyecto):Observable<[]>{
    let consulta = {id: proyecto._id};
    return this.http.post<[]>(this.baseUrl + '/poa/etapasPorProyecto', consulta);
  };

  getProyectosHijos(idProyecto,anio):Observable<[]>{
    let consulta = {idProyecto: idProyecto, anio: anio}
    return this.http.post<[]>(this.baseUrl + '/poa/proyectosHijos', consulta);
  }
}