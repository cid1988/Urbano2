import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false//Con esto si se actualiza el push de un array se actualiza la vista
})
export class ReversePipe implements PipeTransform {

  transform(value) {
    return value.slice().reverse();
  }

}
