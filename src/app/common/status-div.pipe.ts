import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusDiv',
  standalone: true
})
export class StatusDivPipe implements PipeTransform {


  transform(value: string): string {
    if (value.toLowerCase() === 'active') {
      return '<div class="text-custom-success">Active</div>';
    }

   return '<div class="text-custom-danger">Inactive</div>';
  }

}
