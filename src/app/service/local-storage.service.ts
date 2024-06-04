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
    localStorage.setItem('token',token);
    localStorage.setItem('isAdminLoggedIn', 'true');
  }
}
