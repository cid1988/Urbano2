import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient) { }

  getProyectoPorId(idProyecto):Observable<Proyecto>{
    return this.http.post<Proyecto>('http://localhost:3000/api/poa/proyecto', idProyecto);
  }
  getAreasPorPlan(plan):Observable<[]>{
    return this.http.post<[]>('http://localhost:3000/api/poa/areas', plan);
  };

  proyectosPorPlan(plan,area):Observable<Proyecto[]>{
    let consulta = {idPlan: plan._id, idArea: area._id}
    return this.http.post<Proyecto[]>('http://localhost:3000/api/poa/proyectos', consulta)
  };

  etapasPorProyecto(proyecto):Observable<[]>{
    let consulta = {id: proyecto._id}
    return this.http.post<[]>('http://localhost:3000/api/poa/etapasPorProyecto', consulta);
  };

  getProyectosHijos(idProyecto,anio):Observable<[]>{
    let consulta = {idProyecto: idProyecto, anio: anio}
    return this.http.post<[]>('http://localhost:3000/api/poa/proyectosHijos', consulta);
  }
}