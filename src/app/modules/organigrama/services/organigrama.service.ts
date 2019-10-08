import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Organigrama } from '../models/organigrama'

@Injectable({
  providedIn: 'root'
})
export class OrganigramaService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getOrganigrama():Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/organigrama')
  }
  nuevoOrganigrama(reparticion):Observable<Organigrama>{
    return this.http.post<Organigrama>(this.baseUrl + '/organigrama' , reparticion);
  }
  listarOrganigramaPorId(idRepartcion):Observable<Organigrama>{
    return this.http.get<Organigrama>(this.baseUrl + '/organigrama/'+idRepartcion)
  }
  actualizarOrganigrama(reparticion):Observable<Organigrama>{
    return this.http.put<Organigrama>(this.baseUrl + '/organigrama/' + reparticion._id, reparticion);
  }
  getOrganigramaSimple():Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/organigramaSimple')
  }
  eliminarOrganigrama(id):Observable<[]>{
    return this.http.delete<[]>(this.baseUrl + '/organigrama/'+ id)
  }
}
