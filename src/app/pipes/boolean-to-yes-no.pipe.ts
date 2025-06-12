import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class BooleanToYesNoPipe implements PipeTransform {
  transform(value: string | number): string {
    return value === '1' ? 'Sí' : 'No';
  }
}
