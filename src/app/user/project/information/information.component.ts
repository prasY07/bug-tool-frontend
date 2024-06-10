import { Component } from '@angular/core';
import { AddBugComponent } from '../add-bug/add-bug.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { BugService } from '../service/bug.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [AddBugComponent,CommonModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {

  projectDeatils : any = {};
  isModalOpen: boolean = false;
  projectId: string='';
  bugs:any[]= [];
  constructor(
    private aRoute: ActivatedRoute,
    private projectService:ProjectService,
    private bugService:BugService
  ) { }
  addBug() {
    this.isModalOpen = true;
  }

  handleCloseModal() {
    console.log("close",this.isModalOpen);
    this.isModalOpen = false;
  }

  ngOnInit() {
    this.aRoute.params.subscribe(params => {
      this.projectId = params['id'];
    this.getBugs();

    });

  }
  getProjectDetails(){
  }

  getBugs(){

    this.bugService.getBug(this.projectId).subscribe((data:any)=>{
      this.bugs = data.data;
    },error=>{
      console.error('Error fetching users:', error);

    })
  }
}
