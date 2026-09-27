import { Injectable } from '@angular/core';
import { environment } from '../auth/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterserviceService {

   private baseUrl = environment.apiUrl;
     
    constructor(private http: HttpClient) {}
  
    //Employee Service Methods
    getEmployees(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/employee/getEmployees`);
    } 
    addEmployee(employeeData: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/employee/addEmployee`, employeeData);
    }  
    updateEmployee(employeeid: string, employeeData: any): Observable<any> {
     return this.http.put(`${this.baseUrl}/employee/updateEmployee/${employeeid}`, employeeData);
    }
    deleteEmployee(employeeid: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/employee/deleteEmployee/${employeeid}`);
    }

     //Role Rights Service Methods
    getRoleRights(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/rolerights/getRoleRights`);
    } 
    addRoleRights(roleData: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/rolerights/addRoleRights`, roleData);
    }  
    updateRoleRights(roleid: string, roleData: any): Observable<any> {
     return this.http.put(`${this.baseUrl}/rolerights/updateRoleRights/${roleid}`, roleData);
    }
    deleteRoleRights(roleid: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/rolerights/deleteRoleRights/${roleid}`);
    }

    //Customer Service Methods
    addCustomer(data: any): Observable<string> {
      return this.http.post<string>(this.baseUrl+"/customer/addCustomer",data,{ responseType: 'text' as 'json'});
    }
    getCustomers(): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl + '/customer/getCustomers');
    }
    getTempCustomers(): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/customer/getTempCustomers',{});
    }
    getCustomerById(customerId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/customer/getCustomerById/' + customerId);
    }
  
}
