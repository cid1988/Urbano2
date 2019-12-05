import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CalendarioService } from '../../services/calendario/calendario.service';
import { ActivatedRoute } from '@angular/router';
import { Temario } from '../../models/temario';
import { Reunion } from '../../models/reunion';

@Component({
  selector: 'app-temario',
  templateUrl: './temario.component.html',
  styleUrls: ['./temario.component.css']
})
export class TemarioComponent implements OnInit {
  editando:Boolean=false;
  temario = new Temario({});
  reunion= new Reunion({});
  config = environment.tinymceConfig;
  enviado:string='Nunca enviado';
  envio:Boolean=false;
  envioPropuesta:Boolean=false;
  encabezado:String='';
  htmlPrint:String='';
  

  constructor(private calendarioService: CalendarioService, private actRoute: ActivatedRoute) { 
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.encabezado= '<div class="container" style="font-size: 18px;">'+
    '<div class="row">'+
      '<div class="col-6" style="text-align: center;">'+
        "<img src='assets/img/LogoTemario.JPG'>"+
      "</div>"+
      '<div class="col-6" style="text-align: right;">'+
        '<div class="col-12" style="border-bottom: 5px solid yellow;">Data Ministerio</div>'+
        '<div class="col-12" style="border-bottom: 5px solid yellow;">Nombre Reunion</div>'+
        '<div class="col-12" style="border-bottom: 5px solid yellow;">Tipo Reunion</div>'+
      '</div>'+
    "</div>"+
    '<div class="row" style="background-color: lightgray">'+
        '<div class="col-4">Area</div>'+
        '<div class="col-4">Lugar</div>'+
        '<div class="col-4">Fecha - Horaio</div>'+
    '</div>'+
    '<div class="row" >'+
        '<div class="col-4">Info Area</div>'+
        '<div class="col-4">Info Lugar</div>'+
        '<div class="col-4">Info Fecha - Horaio</div>'+
    '</div>'+
    '<div class="row" style="background-color: lightgray">'+
        '<div class="col-12">Proxima Reunion prevista: Info</div>'+
    '</div> </div>';
    this.calendarioService.getTemarioPorReunion(id).subscribe((data:any)=>{
      this.temario=new Temario(data);
      if(this.temario.propuestaEnviado.version && this.temario.propuestaEnviado.version!=''){
        this.enviado='Propuesta enviado'
        if(this.temario.enviado.version && this.temario.enviado.version!=''){
          this.enviado='Propuesta y final enviado'
        }
      }else{
        if(this.temario.enviado.version && this.temario.enviado.version!=''){
          this.enviado='Final enviado'
        }
      }
      if(data._datosReunion) this.reunion=new Reunion(data._datosReunion);
      else{
        this.calendarioService.getReunionPorID(id).subscribe((data:any)=>{
          this.reunion=new Reunion(data);
          this.temario.instancia = this.reunion._id;
          delete this.temario._id;
          this.calendarioService.guardarNuevoTemario(this.temario).subscribe((data:Temario)=>{
            this.temario=new Temario(data);
          });
        })
      }
    })
    
  }

  ngOnInit() {
  }

  guardar() {
    this.htmlPrint = this.encabezado + '<div class="row">' + this.temario.html + '</div>';
    this.calendarioService.guardarTemario(this.temario).subscribe((data:any)=>{
      this.editando=false;
      console.log(this.editando)
    });
  }
  print(event){
    console.log(event)
  }
}
