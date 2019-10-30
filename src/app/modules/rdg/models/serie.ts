export class Serie {
    cita: {
        para:[],
        cc:[],
        cco:[],
        exclisivos:[]
    };
    frecuencia: String;
    minuta: {
        para:[],
        cc:[],
        cco:[],
        exclisivos:[]
    };
    participantes: [];
    propuestaTemario: {
        para:[],
        cc:[],
        cco:[],
        exclisivos:[]
    };
    temario: {
        para:[],
        cc:[],
        cco:[],
        exclisivos:[]
    };
    tipo: String;

    constructor(){
        this.cita={
            para:[],
            cc:[],
            cco:[],
            exclisivos:[]
        };
        this.frecuencia='';
        this.minuta= {
            para:[],
            cc:[],
            cco:[],
            exclisivos:[]
        };
        this.participantes= [];
        this.propuestaTemario= {
            para:[],
            cc:[],
            cco:[],
            exclisivos:[]
        };
        this.temario= {
            para:[],
            cc:[],
            cco:[],
            exclisivos:[]
        };
        this.tipo='';
    }
}