import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../../models/proyecto';
import { environment } from '../../../../../environments/environment';
import { Etapa } from '../../models/etapa';

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

  proyectosPorPlan(idPlan,idArea):Observable<Proyecto[]>{//Es necesario pasar el plan?
    return this.http.get<Proyecto[]>(this.baseUrl + '/poa/proyectos?idJurisdiccion=' + idArea + '&idPlan=' + idPlan)
  };

  etapasPorProyecto(idProyecto):Observable<Etapa[]>{
    return this.http.get<Etapa[]>(this.baseUrl + '/poa/etapas?idProyecto=' + idProyecto);
  };

  getProyectosHijos(idProyecto,idPlan):Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/poa/proyectos?idPlan=' + idPlan + '&proyectoPadre=' + idProyecto);
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

  getObjetivosImpacto():Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/poa/proyectos');
  }

  getCompromisosGobierno():Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/poa/compromisosGobierno');
  }

  getPoaGrupos():Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/poa/grupos');
  }
  
  getPrioridadesMinisteriales():Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/poa/prioridadesMinisteriales');
  }
}