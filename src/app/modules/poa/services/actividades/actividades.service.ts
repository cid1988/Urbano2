import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AutenticacionService } from 'src/app/shared-modules/login/services/autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  baseUrl = environment.baseUrl

  constructor(private http:HttpClient, private autenticacion: AutenticacionService) { }

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
    return this.http.post<{}>(this.baseUrl + '/poa/actividades', actividad,
    {
      headers: new HttpHeaders().set("Authorization","Bearer " + this.autenticacion.getToken())
    });
  }
  
  guardarActividad(actividad):Observable<{}>{
    return this.http.put<{}>(this.baseUrl + '/poa/actividades/' + actividad._id, actividad,
    {
      headers: new HttpHeaders().set("Authorization","Bearer " + this.autenticacion.getToken())
    });
  }
  
  crearEtapa(etapa):Observable<{}>{
    return this.http.post<{}>(this.baseUrl + '/poa/etapas/', etapa);
  }

  editarEtapa(etapa):Observable<{}>{
    return this.http.put<{}>(this.baseUrl + '/poa/etapas/' + etapa._id, etapa);
  }

  filtrarLista(array,items): any[] {//Deberia estar en shared modules
    if(!items) return;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      array = array.filter(i => i.nombre !== item.nombre);
    }
    return array;
  }
}
