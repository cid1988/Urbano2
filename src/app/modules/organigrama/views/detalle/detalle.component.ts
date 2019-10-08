import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
import { Organigrama } from '../../models/organigrama'
import { OrganigramaService } from '../../services/organigrama.service';
import { ActivatedRoute, Router} from "@angular/router"

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  submitted = false;
  reparticion: FormGroup
  organigrama: Organigrama[]
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
  constructor(private organigramaService: OrganigramaService,
    private formBuilder: FormBuilder,
    private actRoute: ActivatedRoute, private router: Router ) { 
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.organigramaService.getOrganigramaSimple().subscribe(organigrama =>{
        this.organigrama = organigrama;
      })
      this.organigramaService.listarOrganigramaPorId(id).subscribe(reparticion =>{
        this.reparticion = this.formBuilder.group({
            _id:[reparticion._id],
            nombreCompleto: [reparticion.nombreCompleto,Validators.required],
            sigla: [reparticion.sigla,Validators.required],
            nombreCortoJurisdiccion: [reparticion.nombreCortoJurisdiccion],
            nombreCortoOrganigrama: [reparticion.nombreCortoOrganigrama],
            superiorInmediato: [reparticion.superiorInmediato],
            categoria: [reparticion.categoria],
            nivel: [reparticion.nivel,Validators.required],
        });
      })
    }

    ngOnInit() {
        
    }

    get f() { return this.reparticion.controls; }
    guardarReparticion(){
        this.submitted = true;

        // stop here if form is invalid
        if (this.reparticion.invalid) {
            return;
        }
        // display form values on success
        this.organigramaService.actualizarOrganigrama(this.reparticion.value).subscribe(data =>{
            console.log(data)
            this.volverPortada()
        })
        
    }
    eliminarReparticion(){
        this.organigramaService.eliminarOrganigrama(this.reparticion.value._id).subscribe(data =>{
            console.log(data)
            this.volverPortada()
        })
        
    }
    volverPortada() {
        this.router.navigateByUrl('/organigrama');
    };

}
