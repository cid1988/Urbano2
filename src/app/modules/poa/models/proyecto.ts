export interface Proyecto {
  _id: string;
  nombre: string;
  idJurisdiccion: string;
  proyectoPadre: string;
  eliminado: boolean;
  hijos: [];
}

export class Proyecto {
  constructor(
    public _id:string,
    public nombre:string
  ){}
}