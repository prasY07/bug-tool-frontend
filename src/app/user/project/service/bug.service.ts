import { Injectable } from '@angular/core';
import { UserBaseApiService } from '../../../service/user-base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private baseApi: UserBaseApiService) { }

  addBug(data:object, id:string):Observable<any>{
    return this.baseApi.submitData(`user/${id}/add-bug`,data);
  }

  getBug(id:string):Observable<any>{
    return this.baseApi.getData(`user/${id}/get-project-bugs`);
  }


}
