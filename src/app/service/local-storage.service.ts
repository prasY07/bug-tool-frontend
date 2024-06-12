import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  checkAdminLoggedIn(): boolean {
    if (localStorage.getItem('isAdminLoggedIn')) {
      return true;
    }
    return false;

  }

  setAdminAuthToken(token:string){
    localStorage.setItem('adminToken',token);
    localStorage.setItem('isAdminLoggedIn', 'true');
  }


  setUserAuthToken(token:string,userData:object){
    localStorage.setItem('userToken',token);
    localStorage.setItem('isUserLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
  }
}
