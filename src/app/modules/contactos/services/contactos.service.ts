import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
}) 
export class ContactosService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl

  getContacto(id):Observable<Contacto>{
    return this.http.get<Contacto>(this.baseUrl + '/contactos/'+ id);
  };

  getContactos():Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/contactos');
  };

  
}
