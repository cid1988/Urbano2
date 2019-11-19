import { Component, OnInit } from '@angular/core';
import { CalendarioService } from '../../services/calendario/calendario.service';
import { ActivatedRoute} from "@angular/router"
import { Cita } from "../../models/cita"
import * as moment from 'moment'
import { ContactosService } from 'src/app/modules/contactos/services/contactos.service';
import { Contacto } from 'src/app/modules/contactos/models/contacto';
import { Reunion } from '../../models/reunion';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  
  ultimaActualizacion:String='Nunca enviado';
  contactos:Contacto[];
  reunion:Reunion; serie:any;
  cita;
  color:String;
  correos={ para:[], cc:[], cco:[], exclusivos:[]};
  tiempoReunion:String;
  lugar:String ;
  fecha: string;
  fechaYLugar:String;
  cabeza:String='<span style="font-weight: bold; text-decoration: underline;" data-mce-style="font-weight: bold; text-decoration: underline;">Estimad@s</span><br><br>';
  pieCiMoRe:String;
  pie:String='<div style="text-align: left;"><br><br><img style="display: inline-block;" src="https://i.imgur.com/nbnWNfJ.png" width="70"><div style="display: inline-block; text-align: left;  padding-left: 15px;">Dirección General de Seguimiento de Gestión<br>Ministerio de Desarrollo Urbano y Transporte<br>5030-9522 (int. 5125)</div></div>';
 


  constructor( private calendarioService: CalendarioService, private actRoute:ActivatedRoute , private contactoService: ContactosService) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.contactoService.getContactosSimple().subscribe((contactos:Contacto[])=>{
      this.contactos=contactos;
      this.calendarioService.getReunionPorID(id).subscribe((reunion:Reunion)=>{
        this.reunion=new Reunion(reunion);
        this.calendarioService.armarCitaPorSerie(this.reunion.reunion).subscribe((info:any)=>{
          this.correos=info.idContactos
          this.serie=info.serie
          this.color= info.serie.color.color
          this.datosAdicionales()
          this.calendarioService.getMinutaPorIdReunion(id).subscribe((cita:Cita)=>{
            if(cita!=null){
              this.cita=new Cita(cita);
              if(this.cita.asunto=='') this.armarCita();
            }else{
              this.cita=new Cita({});
              this.armarCita();
            } 
          })
        })
      })  
    }) 
  }

  ngOnInit() {
  }

  datosAdicionales(){
    this.tiempoReunion = moment(this.reunion.hastaDate).diff(this.reunion.desdeDate, 'minutes') + ' min';
    this.lugar= (this.reunion.ubicacion) ? ' <span style="font-weight:bold;text-decoration:underline">sita en ' + this.reunion.ubicacion.nombre + '.</span>' : '.';
    this.fecha= '<span style="font-weight:bold;text-decoration:underline">'+ moment(this.reunion.desdeDate).locale('es').format('dddd DD [de] MMMM [a las] HH:mm [hs]')+ '</span>';
    this.fechaYLugar= this.fecha + '(' + this.tiempoReunion + ') ' + this.lugar + '<br><br>' ;
    this.pieCiMoRe= 'Oportunamente estarán recibiendo los temas a tratar por los referentes del área.<br><br>' + 'Aguardo confirmación.<br><br>' + 'Saludos,<br><br>' + 'Atte.<br><br>';
    this.color=this.serie.color.color;
    this.color=this.color.toUpperCase();
  }

  armarCita(){
    if(this.serie.tipo == 'visitaObra'){
			this.cita.asunto = this.serie.nombre + ' - ' + 'Cita para visita a obra';
		}else this.cita.asunto = this.serie.nombre + ' - ' + 'Cita para Reunión ' + this.serie.color.de;
		
		this.cita.version = 'final';
		
		if(this.serie.tipo == 'seguimientoJefatura' || this.serie.tipo == 'especificasJefatura') {
			this.cita.mensajeHtml = '<div style="font-size: 17px;">' + this.cabeza + 'Por medio de la presente hacemos extensiva la siguiente convocatoria:<br><br>La reunión por tema de referencia se realizará en fecha ' + this.fechaYLugar + 'Aguardo confirmación.<br><br>' + 'Saludos,<br><br>' + 'Atte.<br><br>' + this.pie + '</div>';
		} else {
			if(this.serie.tipo == 'visitaObra'){
				this.cita.mensajeHtml = '<div style="font-size: 17px;">' + this.cabeza + 'Por medio de la presente los invitamos a participar de la visita a '+ this.serie.nombre + ' que se realizará el día ' + this.fechaYLugar + this.generarConvocados(this.correos.para) + 'Aguardo confirmación.<br><br>' + 'Saludos,<br><br>' + 'Atte.<br><br>' + this.pie + '</div>';
			} else{
				this.cita.mensajeHtml = '<div style="font-size: 17px;">' + this.cabeza + 'Por medio de la presente se los convoca a la reunión por tema de referencia en fecha ' + this.fechaYLugar + this.generarConvocados(this.correos.para) + this.pieCiMoRe + this.pie + '</div>';
			}
		}
  }
  armarModificacion(){
		if(this.serie.tipo == 'visitaObra'){
			this.cita.asunto = this.serie.nombre + ' - Modificacion - ' + 'Cita para visita a obra';
		}else this.cita.asunto = this.serie.nombre + ' - Modificacion - ' + 'Cita para Reunión ' + this.serie.color.de;
		
		this.cita.version = 'modificacion';
		if(this.serie.tipo == 'seguimientoJefatura' || this.serie.tipo == 'especificasJefatura') {
			this.cita.mensajeHtml = '<div style="font-size: 17px;">' + this.cabeza + 'Por medio de la presente hacemos extensiva la siguiente modificación:<br><br>La reunión por tema de referencia se realizará en fecha ' + this.fechaYLugar + 'Aguardo confirmación.<br><br>' + 'Saludos,<br><br>' + 'Atte.<br><br>' + this.pie  +  "<br><br><br><br>" + '</div>';
		} else {
			if(this.serie.tipo == 'visitaObra'){
				this.cita.mensajeHtml = '<div style="font-size: 17px;">' + this.cabeza + 'Debido a una modificación en la agenda la visita a '+ this.serie.nombre + ' se realizará en fecha' + this.fechaYLugar +'Saludos,<br><br>' + 'Atte.<br><br>' + this.pie  +'</div>';
			} else{
				this.cita.mensajeHtml = '<div style="font-size: 17px;">' + this.cabeza + 'Debido a una modificación en la agenda la reunión por tema de referencia se realizará en fecha' + this.fechaYLugar + this.generarConvocados(this.correos.para) + this.pieCiMoRe + this.pie  + '</div>';
			}
		}
  }
  armarRecordatorio(){
		if(this.serie.tipo == 'visitaObra'){
			this.cita.asunto = this.serie.nombre + ' - Recordatorio - ' + 'Cita para visita a obra';
		}else this.cita.asunto = this.serie.nombre + ' - Recordatorio - ' + 'Cita para Reunión ' + this.serie.color.de;
		
		this.cita.version = 'recordatorio';

		if(this.serie.tipo == 'seguimientoJefatura') {
			this.cita.mensajeHtml = '<div style="font-size: 17px;">' + this.cabeza + 'Por medio de la presente les recordamos que la reunión por tema de referencia se realizará en fecha ' + this.fechaYLugar + this.pieCiMoRe + this.pie + '</div>';
		} else {
			if(this.serie.tipo == 'visitaObra'){
				this.cita.mensajeHtml = '<div style="font-size: 17px;">' + this.cabeza + 'Por medio de la presente les recordamos que la visita a '+ this.serie.nombre +' se realizará en fecha ' + this.fechaYLugar + this.generarConvocados(this.correos.para) + 'Aguardo confirmación.<br><br>' +'Saludos,<br><br>' + 'Atte.<br><br>' + this.pie  + '</div>';
			} else{
				this.cita.mensajeHtml = '<div style="font-size: 17px;">' + this.cabeza + 'Por medio de la presente les recordamos que la reunión por tema de referencia se realizará en fecha ' + this.fechaYLugar + this.generarConvocados(this.correos.para) + this.pieCiMoRe + this.pie + '</div>';
			}
		}
  }
  armarCancelacion(){
    if(this.serie.tipo == 'visitaObra'){
			this.cita.asunto = this.serie.nombre + ' - Cancelación - ' + 'Cita para visita a obra';
		}else this.cita.asunto = this.serie.nombre + ' - Cancelación - ' + 'Cita para Reunión ' + this.serie.color.de;
		this.cita.version = 'cancelado';
		if(this.serie.tipo == 'visitaObra'){
			this.cita.mensajeHtml = '<div style="font-size: 17px;">' + this.cabeza + 'Les informamos que la visita a '+ this.serie.nombre+ ' que se realizaría el ' + this.fecha +', fue cancelada hasta nuevo aviso. Nos pondremos en contacto cuando reagendemos la misma.<br><br>' + 'Ante cualquier consulta pueden comunicarse telefónicamente o vía mail con nuestras oficinas.<br><br>' + 'Saludos,<br><br>' + 'Atte.<br><br>'  + this.pie  + '</div>';
		}else this.cita.mensajeHtml = '<div style="font-size: 17px;">' + this.cabeza + 'Les informamos que la reunión de referencia que se realizaría el ' + this.fecha + ', fue cancelada hasta nuevo aviso. Nos pondremos en contacto cuando reagendemos la misma.<br><br>' + 'Ante cualquier consulta pueden comunicarse telefónicamente o vía mail con nuestras oficinas.<br><br>' + 'Saludos,<br><br>' + 'Atte.<br><br>'  + this.pie  + '</div>';
  }
  
  generarConvocados(contactos){
    if(!contactos || contactos.length == 0) {
			return '';
		}
		var nombres = [];
		
		var l = 'Los convocados son: <br><br><ul>';
		
		if (this.serie.tipo == 'seguimiento') {

			nombres.push('MOCCIA, Franco');
			nombres.push('DIAZ VALDEZ, Adolfo');
		}
		for (var i = 0; i < contactos.length; i++) {
      nombres.push(this.buscarContacto(contactos[i].contactoId))
			
		}
		if (this.serie.tipo == 'seguimiento') {

			nombres.push('COLOMBRAM, Julieta');
			nombres.push('ROMANO, Juan Pablo');
			nombres.push('DE MARTINO, Emiliano');			
		}
		l += '<li>' + nombres.join('<li>') + '</ul><br>';

		return l;
  }

  buscarContacto(id){
    for (let index = 0; index < this.contactos.length; index++) {
      if(this.contactos[index]._id == id){
        return this.contactos[index].nombreCompleto
      }
    }
  }

  getHora(dato){
    if(dato){
      return moment(dato).format("HH:mm")
    } else return ''
  }
  getFecha(dato){
    if(dato){
      return moment(dato).locale('es').format('DD/MM/YYYY')
    } else return ''
  }
}
