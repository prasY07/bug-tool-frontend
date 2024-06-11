import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Pipe({
  name: 'projectStatus',
  standalone: true
})
export class ProjectStatusPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    let statusHtml: string;

    switch (value) {
      case 'Not Started':
        statusHtml = '<span class="not_started">Not Started</span>';
        break;
      case 'In Progress':
        statusHtml = '<span class="in_progress">In Progress</span>';
        break;
      case 'Completed':
        statusHtml = '<span class="completed">Completed</span>';
        break;
      default:
        statusHtml = '<span class="unknown_status">Unknown Status</span>';
    }

    return this.sanitizer.bypassSecurityTrustHtml(statusHtml);
  }
}
