import mongoose from 'mongoose';

export interface Proyecto {
  _id: mongoose.Schema.Types.ObjectId;
  nombre: string;
  idJurisdiccion: string;
  proyectoPadre: string;
  eliminado: boolean;
  hijos: [];
  codigo: string;
  descripcion: string;
  titulo: string;
  start: string;
}

// export class Proyecto {
//   constructor(
//     public _id:string,
//     public nombre:string
//   ){}
// }