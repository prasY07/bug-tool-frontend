import { Component } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  projects: any[] = [];


  constructor(
    private projectService:ProjectService,

  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAssignProjects()
      .subscribe(
        (data: any) => {
          this.projects = data.data;
        },
        error => {
          console.error('Error fetching users:', error);
          alert("No Project found");
        }
      );

  }

}
