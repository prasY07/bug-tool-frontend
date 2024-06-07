import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserBaseApiService } from '../../../service/user-base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor(private baseApi: UserBaseApiService) { }

  getAssignProjects():Observable<any>{
    return this.baseApi.getData('user/get-assign-projects');
  }

  getProjectsMembers(id:string):Observable<any>{
    return this.baseApi.getData(`user/${id}/project-assign-member`);

  }
}
