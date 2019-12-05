import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reunion } from '../../models/reunion';
import { environment } from '../../../../../environments/environment';
import { Cita } from '../../models/cita';
import { Minuta } from '../../models/minuta';
import { Temario } from '../../models/temario';
import { AutenticacionService } from 'src/app/shared-modules/login/services/autenticacion/autenticacion.service';
import { Compromiso } from '../../models/compromiso';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http: HttpClient ,private autenticacion:AutenticacionService) { }
  baseUrl = environment.baseUrl + '/rdg';
  token={
    headers: new HttpHeaders().set("Authorization","Bearer " + this.autenticacion.getToken())
  }

  //Reuniones

  getReuniones():Observable<Reunion[]>{
    return this.http.get<Reunion[]>(this.baseUrl + '/reuniones');
  };
  getReunionPorID(id):Observable<Reunion>{
    return this.http.get<Reunion>(this.baseUrl + '/reuniones/' + id);
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
  getCitasPorReunion(id):Observable<{}>{
    return this.http.get<Cita>(this.baseUrl + '/citasPorReunion/'+ id);
  }
  armarCitaPorSerie(id):Observable<{}>{
    return this.http.get<{}>(this.baseUrl + '/citas/armarPorSerie/'+ id);
  }
  nuevaCita(cita:Cita):Observable<{}>{
    return this.http.post<{}>(this.baseUrl + '/citas', cita , this.token);;
  }
  //Minutas

  getMinutaPorIdReunion(id):Observable<{}>{
    return this.http.get<Minuta>(this.baseUrl + '/minutaPorReunion/'+ id);
  }
  guardarMinuta(minuta):Observable<Minuta>{
    return this.http.put<Minuta>(this.baseUrl + '/minutas/'+ minuta._id, minuta);
  }
  nuevaMinuta(minuta):Observable<Minuta>{
    return this.http.post<Minuta>(this.baseUrl + '/minutas',minuta);
  }

  //Compromisos

  getCompromisosPorSerie(data):Observable<[]>{
    console.log(data)
    return this.http.get<[]>(this.baseUrl + '/compromisos?idSerie=' + data.reunion )
  }
  getCompromisosPorReunion(data):Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/compromisos?idReunion=' + data._id )
  }
  nuevoCompromiso(compromiso):Observable<Compromiso>{
    return this.http.post<Compromiso>(this.baseUrl + '/compromisos' , compromiso , this.token)
  }
  actualizarCompromiso(compromiso):Observable<Compromiso>{
    return this.http.put<Compromiso>(this.baseUrl + '/compromisos/' + compromiso._id, compromiso , this.token)
  }

  //Temario

  getTemarioPorReunion(id):Observable<Temario>{
    return this.http.get<Temario>(this.baseUrl + '/temarioPorReunion/'+ id)
  }
  guardarTemario(temario):Observable<{}>{
    return this.http.put<{}>(this.baseUrl + '/temarios/'+ temario._id , temario)
  }
  guardarNuevoTemario(temario):Observable<{}>{
    return this.http.post<{}>(this.baseUrl + '/temarios', temario)
  }
}
