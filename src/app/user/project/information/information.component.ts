import { Component } from '@angular/core';
import { AddBugComponent } from '../add-bug/add-bug.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [AddBugComponent],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {

  projectDeatils : any = {};
  isModalOpen: boolean = false;
  projectId: string='';

  constructor(
    private aRoute: ActivatedRoute,
    private projectService:ProjectService,
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
    });
  }
  getProjectDetails(){

  }
}
