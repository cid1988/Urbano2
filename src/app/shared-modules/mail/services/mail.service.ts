import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AutenticacionService } from '../../login/services/autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient, private autenticacion: AutenticacionService) { }

  envioMail(infoMail){
    return this.http.post(this.baseUrl + '/enviarMail', infoMail,
    {
      headers: new HttpHeaders().set("Authorization","Bearer "+ this.autenticacion.getToken())
    });
  }
}
