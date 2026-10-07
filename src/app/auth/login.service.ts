import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';
import { LoginResponse } from '../models/login-response';
import { MenuModule } from '../models/menu-master';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  userLogin(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl+"/auth/userlogin",data);
  }

  registerUser(data: any): Observable<string> {
    return this.http.post<string>(this.baseUrl+"/auth/userRegister",data);
  }

   resetPassword(data: any): Observable<string> {
    return this.http.post<string>(this.baseUrl+"/auth/resetPassword",data);
  }

  getUserMenu(userid: number) {
    return this.http.get<MenuModule[]>(`${this.baseUrl}/menu/${userid}`);
  }
}
