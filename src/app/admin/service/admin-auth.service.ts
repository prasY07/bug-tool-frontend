import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {


  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  checkUserCredentials(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/login`,{email:email,password:password});
  }

  logout(token:string|null){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    return this.http.get<any>(`${this.apiUrl}/api/admin/logout`, { headers });

  }
}
