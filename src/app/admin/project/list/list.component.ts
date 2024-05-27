import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CustomDateFormatPipe } from '../../../commonPipe/custom-date-format.pipe';
import { ProjectStatusPipe } from '../../../commonPipe/project-status.pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink,CommonModule,CustomDateFormatPipe,ProjectStatusPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  projects: any[] = [];


  constructor(
    private projectService:ProjectService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }


  loadProjects() {
    this.projectService.getProjects()
      .subscribe(
        (data: any) => {
          // console.log("dd",data.data);
          this.projects = data.data;
          // this.isLoading = true;
        },
        error => {
          console.error('Error fetching users:', error);
          alert("No Project found");
        }
      );

  }

  changeStatus(id:string){

  }
}
