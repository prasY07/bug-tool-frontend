import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../service/base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private baseApi: BaseApiService) { }

  createProject(data:object){
    return this.baseApi.submitData('admin/project/create',data);
  }

  updateProject(data:object,id:string){
    return this.baseApi.updateData(`admin/project/${id}/update`,data);
  }

  getProjects():Observable<any>{
    return this.baseApi.getData('admin/projects');
  }

  getSingleProjects(id:string):Observable<any>{
    return this.baseApi.getInformation(`admin/project/${id}/information`);
  }

  updateStatus(id:string){
    return this.baseApi.updateStatus(`admin/project/${id}/update-status`);
  }
}
