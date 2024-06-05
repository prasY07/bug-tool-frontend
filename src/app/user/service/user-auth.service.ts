import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  checkUserCredentials(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/login`,{email:email,password:password});
  }

  logout(token:string|null){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
    });

    return this.http.get<any>(`${this.apiUrl}/user/logout`, { headers });

  }
}
