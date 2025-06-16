import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class BooleanToYesNoPipe implements PipeTransform {
  transform(value: boolean | number): string {
    return value == true ? 'Sí' : 'No';
  }
}
