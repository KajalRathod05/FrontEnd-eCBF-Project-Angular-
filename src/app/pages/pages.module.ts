import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { AddemployeeComponent } from './employee/addemployee/addemployee.component';
import { EditemployeeComponent } from './employee/editemployee/editemployee.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { LoanComponent } from './loan/loan/loan.component';
import { AddloanComponent } from './loan/addloan/addloan.component';
import { EditlaonComponent } from './loan/editlaon/editlaon.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { AddcustomerComponent } from './customers/addcustomer/addcustomer.component';
import { ProfileComponent } from './profile/profile.component';
import { AddeditcustomerComponent } from './customers/addeditcustomer/addeditcustomer.component';
import { CustomerActTrackerComponent } from './customers/customer-act-tracker/customer-act-tracker.component';
import { EditcustomerComponent } from './customers/editcustomer/editcustomer.component';


@NgModule({
  declarations: [
    LayoutComponent,
    AddemployeeComponent,
    EditemployeeComponent,
    EmployeeComponent,
    LoanComponent,
    AddloanComponent,
    EditlaonComponent,
    CustomerComponent,
    AddcustomerComponent,
    ProfileComponent,
    AddeditcustomerComponent,
    CustomerActTrackerComponent,
    EditcustomerComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ],
   exports: [
    LayoutComponent
  ]
})
export class PagesModule { }
