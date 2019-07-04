import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  // transform(array: any[], args: string): any[] {
  //   array.sort((a: any, b: any) => {
  //     if (a < b) {
  //       return -1;
  //     } else if (a > b) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   return array;
  // }

    transform(array: Array<any>, orderField: string, orderType: boolean, dataType: string): Array<string> {
        if(!array) return;
        array.sort((a: any, b: any) => {
            let ae = a[orderField];
            let be = b[orderField];
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