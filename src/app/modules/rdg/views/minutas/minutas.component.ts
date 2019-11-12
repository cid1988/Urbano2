import { Component, OnInit } from '@angular/core';
import { CalendarioService } from '../../services/calendario/calendario.service';
import { ActivatedRoute } from '@angular/router';
import { Minuta } from '../../models/minuta';
import { environment } from 'src/environments/environment';
import { Reunion } from '../../models/reunion';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment'
import { ModalCompromisoComponent } from '../../components/modals/modal-compromiso/modal-compromiso.component';
import { Compromiso } from '../../models/compromiso';

@Component({
  selector: 'app-minutas',
  templateUrl: './minutas.component.html',
  styleUrls: ['./minutas.component.css']
})
export class MinutasComponent implements OnInit {
  datosReunion:Object;
  minuta=new Minuta({});
  verPendientes:Boolean=false;
  guardado:Boolean=false;
  compromisosPendientes:Array<Object>=[];
  cantidadPendientes:Number=0;
  config = environment.tinymceConfig;
  bsModalRef: BsModalRef;

  constructor(private calendarioService:CalendarioService, private actRoute:ActivatedRoute,private modalService: BsModalService) { 
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.calendarioService.getMinutaPorIdReunion(id).subscribe((data:Minuta)=>{
      if(data && data!=null){
        this.minuta=new Minuta(data)
      }else {
        this.minuta=new Minuta({})
        this.minuta.instancia=id;
      }
      console.log(this.minuta)
    })
    this.calendarioService.getReunionPorID(id).subscribe((data:Reunion)=>{
      this.datosReunion=data;
      this.calendarioService.getCompromisosPendientes(data.reunion).subscribe((compromisos:[])=>{
        this.compromisosPendientes=compromisos;
        if(compromisos.length) this.cantidadPendientes=compromisos.map( (a:any) => a.compromisos.length).reduce((a,b) => a + b);
      })
    })
  }

  ngOnInit() {
  }

  getHora(data){
    return moment(data).format('HH:mm')
  }
  guardar(){
    if(this.minuta._id == ''){
      delete this.minuta._id
      this.calendarioService.nuevaMinuta(this.minuta).subscribe((data:any)=>{
        console.log(data)
        this.timeout()

      });
    } else this.calendarioService.guardarMinuta(this.minuta).subscribe((data:any)=>{
      console.log(data)
      this.timeout()
    });
  }

  timeout() {
    this.guardado=true;
    setTimeout(() => {
        this.guardado=false;
    }, 1000);
  }

  nuevoCompromiso(){
    this.bsModalRef = this.modalService.show(ModalCompromisoComponent, { initialState:new Compromiso({}), class: 'modal-lg'});
        
  }
}
