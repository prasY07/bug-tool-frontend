import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../service/base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private baseApi: BaseApiService) { }

  createUser(data:object){
    return this.baseApi.submitData('admin/user/create',data);
  }

  updateUser(data:object,id:string){
    return this.baseApi.updateData(`admin/user/${id}/update`,data);
  }

  getUsers():Observable<userInterface>{
    return this.baseApi.getData('admin/users');
  }

  getDataWithoutPagination():Observable<userInterface>{
    return this.baseApi.getData('admin/users/all');
  }

  getSingleUsers(id:string):Observable<userInterface>{
    return this.baseApi.getInformation(`admin/user/${id}/information`);
  }

  updateStatus(id:string){
    return this.baseApi.updateStatus(`admin/user/${id}/update-status`);
  }
}


interface userInterface{
  name: string,
  email: string,
  id: string,
  status:string
}

