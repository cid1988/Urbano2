export interface Proyecto {
  _id: string;
  nombre: string;
  idJurisdiccion: string;
  proyectoPadre: string;
  eliminado: boolean;
  hijos: [];
}
