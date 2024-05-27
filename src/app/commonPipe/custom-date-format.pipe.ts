import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat',
  standalone: true
})
export class CustomDateFormatPipe implements PipeTransform {



  constructor(private datePipe: DatePipe) {}

  transform(value: string, format: string = 'yyyy-MM-dd'): string | null {
    return this.datePipe.transform(value, format);
  }

}
