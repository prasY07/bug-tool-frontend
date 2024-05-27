import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectStatus',
  standalone: true
})
export class ProjectStatusPipe implements PipeTransform {

  transform(status: string): string {
    switch (status) {
      case 'Not Started':
        return '<div class="not_started">Not Started</div>';
      case 'In Progress':
        return '<div class="in_progress">In Progress</div>';
      case 'Completed':
        return '<div class="completed">Completed</div>';
      case 'On Hold':
        return '<div class="on_hold">On Hold</div>';
      case 'Cancelled':
        return '<div  class="cancelled">Cancelled</div>';
      default:
        return '<div class="default"></div>';
    }
  }

}
