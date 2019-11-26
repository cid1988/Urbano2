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

  constructor(private calendarioService: CalendarioService, private actRoute: ActivatedRoute) { 
    const id = this.actRoute.snapshot.paramMap.get('id');
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
    this.calendarioService.guardarTemario(this.temario).subscribe((data:any)=>{
      this.editando=false;
      console.log(this.editando)
    });
  }
}
