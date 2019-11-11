import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Reunion } from '../../models/reunion';
import { environment } from '../../../../../environments/environment';
import { Cita } from '../../models/cita';
import { Minuta } from '../../models/minuta';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl + '/rdg';

  //Reuniones

  getReuniones():Observable<Reunion[]>{
    return this.http.get<Reunion[]>(this.baseUrl + '/reuniones');
  };
  
  //Tipos de Reuniones

  getTiposReunion():Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/tipos');
  };
  

  guardarNuevaReunion(reunion):Observable<{}>{
    return this.http.post<{}>(this.baseUrl + '/reuniones', reunion);
  }

  actualizarReunion(reunion):Observable<{}>{
    return this.http.put<{}>(this.baseUrl + '/reuniones/' + reunion.id, reunion);
  }

  //Series de Reuniones

  getSeriesReunion():Observable<{}>{
    return this.http.get<{}>(this.baseUrl + '/series');
  }

  //Maestros de Series de Reuniones
  getMaestros():Observable<{}>{
    return this.http.get<{}>(this.baseUrl + '/maestros');
  }

  guardarMaestro(maestro):Observable<{}>{
    return this.http.put<{}>(this.baseUrl + '/maestros/'+ maestro._id,maestro);
  }
  
  nuevoMaestro(maestro):Observable<{}>{
    return this.http.post<{}>(this.baseUrl + '/maestros', maestro)
  }

  //Citas

  getCita(id):Observable<{}>{
    return this.http.get<Cita>(this.baseUrl + '/citas/'+id);
  }
  listarMailCita(id):Observable<{}>{
    const data={idInstancia:id}
    return this.http.post<{}>(this.baseUrl + '/citas/listarCorreos', data);
  }
  //Minutas

  getMinutaPorIdReunion(id):Observable<{}>{
    return this.http.get<Minuta>(this.baseUrl + '/minutaPorReunion/'+ id);
  }
}
