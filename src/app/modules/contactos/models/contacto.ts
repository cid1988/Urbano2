export class Contacto {
    _id: string;
    nombre: string;
    segundoNombre: string;
    nombreCompleto: string;
    sexo: string;
    organigrama: string;
    enorganigrama: string;
    cargo: string;
    area: string;
    apellidos: string;
    servicios: [];
    telefono: [];
    correos: [{
        valor: String,
        checked: Boolean,
        nombre: String
    }];
    direcciones: [];
    roles: []

    constructor(contacto){
        {
            this._id = contacto._id;
            this.nombre = contacto.nombre;
            this.segundoNombre = contacto.segundoNombre;
            this.nombreCompleto = contacto.nombreCompleto;
            this.sexo = contacto.sexo;
            this.organigrama = contacto.organigrama;
            this.enorganigrama = contacto.enorganigrama;
            this.cargo = contacto.cargo;
            this.area = contacto.area;
            this.apellidos = contacto.apellidos;
            this.servicios = contacto.servicios || [];
            this.telefono = contacto.telefono || [];
            this.correos = contacto.correos || [];
            this.direcciones = contacto.direcciones || [];
            this.roles = contacto.roles || []
        }
    }
}