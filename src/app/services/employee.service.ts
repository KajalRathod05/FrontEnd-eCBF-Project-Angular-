import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../auth/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  [x: string]: any;

  private baseUrl = environment.apiUrl;
   
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/employee/getEmployees`);
  }

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/addEmployee`, employeeData);
  } 

  updateEmployee(employeeid: string, employeeData: any): Observable<any> {
   return this.http.put(`${this.baseUrl}/employee/updateEmployee/${employeeid}`, employeeData);
  }

  addAndSendEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee/add-and-send`, employeeData);
  }

  deleteEmployee(employeeid: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employee/deleteEmployee/${employeeid}`);
  }

}
