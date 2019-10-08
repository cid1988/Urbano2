import { Component, OnInit, ViewChild} from '@angular/core';
import { OrganigramaService } from '../../services/organigrama.service';
import { Organigrama } from '../../models/organigrama';

declare var $:any;

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})

export class PortadaComponent implements OnInit {
  organigrama: Organigrama[]
  nuevaReparticion= <Organigrama>{};
  idReparticion:string;
  niveles: {}[] = [{
    "nombre": 'Gobernación',
    "cargo": 'Gobernador/a'
  }, {
    "nombre": 'Ministerio',
    "cargo": 'Ministro/a'
  }, {
    "nombre": 'Secretaría',
    "cargo": 'Secretario/a'
  }, {
    "nombre": 'Subsecretaría',
    "cargo": 'Subsecretario/a'
  }, {
    "nombre": 'Dirección Provincial',
    "cargo": 'Director/a Provincial'
  }, {
    "nombre": 'Dirección de Línea',
    "cargo": 'Director/a de Linea'
  }, {
    "nombre": 'Jefatura de Gabinete',
    "cargo": 'Jefe/a de Gabinete'
  }, {
    "nombre": 'Jefatura de Departamento',
    "cargo": 'Jefe/a de Departamento'
  }, {
      "nombre": 'Presidencia',
      "cargo": 'Presidente/a'
  }, {
      "nombre": 'Dirección General',
      "cargo": 'Director/a General'
  }, {
      "nombre": 'Gerencia General',
      "cargo": 'Gerente/a General'
  }, {
      "nombre": 'Gerencia',
      "cargo": 'Gerente/a'
  }, {
      "nombre": 'Organismo Provincial',
      "cargo": 'Director/a Ejecutivo/a'
  }, {
      "nombre": 'Unidad',
      "cargo": 'Coordinador/a'
  }, {
      "nombre": 'Programa',
      "cargo": 'Coordinador/a'
  }, {
      "nombre": 'Dirección',
      "cargo": 'Director/a'
  }, {
      "nombre": 'Agencia',
      "cargo": 'Director/a Ejecutivo/a',
      "cargo2": 'Subdirector/a Ejecutivo/a',
      "cargo3": 'Gerente/a General'
  }, {
      "nombre": 'Instituto',
      "cargo": 'Secretario/a Ejecutivo/a',
      "cargo2": 'Presidente/a'
  }, {
      "nombre": 'Auditoría',
      "cargo": 'Auditor/a General'
  }, {
      "nombre": 'Consejo',
      "cargo": 'Director/a',
  }, {
      "nombre": 'Escribanía General',
      "cargo": 'Escribano/a'
  }, {
      "nombre": 'Caja de Retiros',
      "cargo": 'Director/a'
  }, {
      "nombre": 'Corporación',
      "cargo": 'Administrador/a General'
  }, {
      "nombre": 'Subdirección Ejecutiva',
      "cargo": 'Subdirector/a Ejecutivo/a'
  }, {
      "nombre": 'Contaduría General',
      "cargo": 'Contador/a General'
  }, {
      "nombre": 'Subcontaduría',
      "cargo": 'Contador/a'
  }, {
      "nombre": 'Contaduría Mayores',
      "cargo": 'Contador/a'
  }, {
      "nombre": 'Tesorería General',
      "cargo": 'Tesorero/a General'
  }, {
      "nombre": 'Subtesorería General',
      "cargo": 'Subesorero/a'
  }, {
      "nombre": 'Secretaría General',
      "cargo": 'Secretario/a'
  }, {
      "nombre": 'Vicepresidencia',
      "cargo": 'Vicepresidente/a'
  }, {
      "nombre": 'Administración General',
      "cargo": 'Administrador/a'
  }, {
      "nombre": 'Subadministración General',
      "cargo": 'Subadministrador/a'
  }, {
      "nombre": 'Gerencia Técnica',
      "cargo": 'Gerente/a'
  }, {
      "nombre": 'Subgerencia',
      "cargo": 'Subgerente/a'
  }, {
      "nombre": 'Coordinación General',
      "cargo": 'Coordinador/a General'
  }, {
      "nombre": 'Asesoría General',
      "cargo": 'Asesor/a General'
  }, {
      "nombre": 'Organismo de la CN'
  }, {
      "nombre": 'Fuera de Nivel'
  }, {
      "nombre": 'Otro'
  }]
  categoria: {}[] = [
    {
      nombre: 'Jurisdiccion'
    }, {
        nombre: 'Organismo Descentralizado'
    }, {
        nombre: 'Autárquico'
    }, {
        nombre: 'Fuera nivel'
    }, {
        nombre: 'Unidades'
    }, {
        nombre: 'Consejos'
    }, {
        nombre: 'Agencias'
    }, {
        nombre: 'Juzgados'
    }, {
        nombre: 'Organismos'
    }, {
        nombre: 'Registro'
    }, {
        nombre: 'Auditoría'
    }, {
        nombre: 'Instituto'
    }, {
        nombre: 'Ente'
    }, {
        nombre: 'Organismo de la CN'
    }
  ];

  constructor( private organigramaService: OrganigramaService) { 
    this.organigramaService.getOrganigrama().subscribe(organigrama =>{
      this.organigrama = organigrama;
    })
  }

  ngOnInit() {
  }
  crearReparticion(confirmado, nuevaReparticion){
    if(confirmado){      
      this.organigramaService.nuevoOrganigrama(nuevaReparticion).subscribe(data =>{
        this.organigramaService.getOrganigrama().subscribe(organigrama =>{
            this.organigrama = organigrama;
        })
        this.nuevaReparticion = {} as Organigrama;
        $('#modalCrearReparticion').modal('hide');
      })
    }else{
      $('#modalCrearReparticion').modal('show');
    }
  }

}
