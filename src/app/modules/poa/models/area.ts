export class Area {
  _id: String;
  nombre: String;
  idOrganigrama: String;
  idPlan: ""

  constructor(area){
    {
      this.nombre = area.nombre || "";
      this.idOrganigrama = area.idOrganigrama || "",
      this.idPlan = area.idPlan || "" 
    }
  }
}