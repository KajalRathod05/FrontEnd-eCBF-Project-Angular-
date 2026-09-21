import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { LoanComponent } from './loan/loan/loan.component';
import { ProfileComponent } from './profile/profile.component';
import { AddcustomerComponent } from './customers/addcustomer/addcustomer.component';
import { AddeditcustomerComponent } from './customers/addeditcustomer/addeditcustomer.component';
import { EditcustomerComponent } from './customers/editcustomer/editcustomer.component';

const routes: Routes = [
   {path: '',
    component: LayoutComponent,
     children:[
       { path: 'dashboard',component:DashboardComponent},
       { path: 'user',component:EmployeeComponent},

       { path: 'customer',component:CustomerComponent},
       { path: 'addCustomer',component:AddcustomerComponent},
       { path: 'addeditcustomer', component: AddeditcustomerComponent},
       { path: 'editCustomer/:id',component:EditcustomerComponent},
       
       { path: 'loan',component:LoanComponent},
       { path: 'profile', component:ProfileComponent},
       
     ]
   }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
