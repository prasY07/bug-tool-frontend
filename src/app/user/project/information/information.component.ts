import { Component } from '@angular/core';
import { AddBugComponent } from '../add-bug/add-bug.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { BugService } from '../service/bug.service';
import { CommonModule } from '@angular/common';
import { CustomDateFormatPipe } from '../../../commonPipe/custom-date-format.pipe';
import { ProjectStatusPipe } from '../../../commonPipe/project-status.pipe';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [AddBugComponent,CommonModule,CustomDateFormatPipe,ProjectStatusPipe],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {

  projectDeatils : any = {};
  isModalOpen: boolean = false;
  projectId: string='';
  bugs:any[]= [];
  loggedInUserData: any = {};

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
     this.getUserData();
     this.aRoute.params.subscribe(params => {
      this.projectId = params['id'];
    this.getBugs();

    });

    this.getProjectDetails();

  }
  getProjectDetails(){
    this.projectService.getProjectsDetails(this.projectId).subscribe((data:any)=>{
      this.projectDeatils = data.data;
    },error=>{
      console.error('Error fetching users:', error);

    })
  }

  getBugs(){

    this.bugService.getBug(this.projectId).subscribe((data:any)=>{
      this.bugs = data.data;
    },error=>{
      console.error('Error fetching users:', error);

    })
  }

  showBugDetails(bug: any) {
    alert(`Title: ${bug.title}\nDescription: ${bug.description}`);
  }

  getUserData() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
     return   this.loggedInUserData=  JSON.parse(userDataString);
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        return null;
      }
    }
    return null;
  }
}


