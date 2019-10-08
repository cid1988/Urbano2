import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {
    //Uso en frontend let a of data | orderBy: 'campo': true/false: 'number'/'string'
    transform(array: Array<any>, orderField: string, orderType: boolean, dataType: string): Array<string> {
        if(!array) return;
        array.sort((a: any, b: any) => {
            let ae = a[orderField];
            let be = b[orderField];
            if (ae === null || be === null) return 0;//Linea agregada porque fallaba el orden en actividades dentro de una etapa cuando es null...revisar que este funcionando bien
            if (ae === undefined && be === undefined) return 0;
            if (ae === undefined && be !== undefined) return orderType ? 1 : -1;
            if (ae !== undefined && be === undefined) return orderType ? -1 : 1;
            if (ae === be) return 0;
            switch (dataType) {
                case "number":
                    ae = parseFloat(ae);
                    be = parseFloat(be);
                    break;
                case "string":
                    ae = ae.toString().toLowerCase();
                    be = be.toString().toLowerCase();
                    break;

                default:
                    break;
            }
            return orderType ? (ae > be ? -1 : 1) : (be > ae ? -1 : 1);
        });
        return array;
    }
}