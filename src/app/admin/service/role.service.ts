import { Injectable } from '@angular/core';
import { BaseApiService } from '../../service/base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private baseApi: BaseApiService) { }


  getRoles():Observable<roleInterface>{
    return this.baseApi.getData('admin/roles');
  }
}

interface roleInterface{
  name: string,
  slug: string,
  id: string,
}
