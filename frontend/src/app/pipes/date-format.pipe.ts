import { Pipe, PipeTransform } from '@angular/core';
import dateFormat from 'dateformat';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, ...args: string[]): string {
    const dateString = value.toString();
    const newDate = new Date(dateString);
    return dateFormat(newDate, args[0] ?? 'dd/mm/yyyy');
  }
}
