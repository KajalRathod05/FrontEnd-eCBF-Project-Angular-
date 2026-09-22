import { Injectable } from '@angular/core';
import { environment } from '../auth/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

   private baseUrl = environment.apiUrl;
 
   constructor(private http: HttpClient) {}
 
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
