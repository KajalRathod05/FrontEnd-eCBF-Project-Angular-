import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { ProfileComponent } from './profile/profile.component';
import { AddcustomerComponent } from './customers/addcustomer/addcustomer.component';
import { AddeditcustomerComponent } from './customers/addeditcustomer/addeditcustomer.component';
import { EditcustomerComponent } from './customers/editcustomer/editcustomer.component';
import { EmployeeComponent } from './system-admin/employee/employee/employee.component';
import { RolerightsComponent } from './system-admin/rolerights/rolerights/rolerights.component';
import { CommodityComponent } from './system-admin/commodity/commodity/commodity.component';
import { CountryComponent } from './system-admin/demography/country/country/country.component';
import { DistrictComponent } from './system-admin/demography/district/district/district.component';
import { LocationComponent } from './system-admin/demography/location/location/location.component';
import { StateComponent } from './system-admin/demography/state/state/state.component';
import { BorrowerComponent } from './borrower/borrower/borrower.component';
import { LoanbookComponent } from './loan-booking/loan-book/loanbook/loanbook.component';
import { RepaymentComponent } from './loan-booking/liquidation/repayment/repayment.component';
import { BorrowerReportComponent } from './mis-reports/borrower-report/borrower-report.component';
import { WarehouseComponent } from './warehose-insurance/warehouse/warehouse/warehouse.component';
import { InsuranceComponent } from './warehose-insurance/insurance/insurance/insurance.component';
import { LaonbookedReportComponent } from './mis-reports/laonbooked-report/laonbooked-report.component';

const routes: Routes = [
   {path: '',
    component: LayoutComponent,
     children:[
       { path: 'dashboard',component:DashboardComponent},

       //Customer
       { path: 'customer',component:CustomerComponent},
       { path: 'addCustomer',component:AddcustomerComponent},
       { path: 'addeditcustomer', component: AddeditcustomerComponent},
       { path: 'editCustomer/:id',component:EditcustomerComponent},

       //System Admin
       { path: 'employeemaster',component:EmployeeComponent},
       { path: 'rolerightsmaster',component:RolerightsComponent},
       { path: 'commoditymaster',component:CommodityComponent},
       { path: 'countrymaster',component:CountryComponent},
       { path: 'statemaster',component:StateComponent},
       { path: 'districtmaster',component:DistrictComponent},
       { path: 'locationmaster',component:LocationComponent},

       //warehouse and insurance
       { path: 'warehousemaster',component:WarehouseComponent},
       { path: 'insurancemaster',component:InsuranceComponent},

       //borrower
       { path: 'borrowermaster', component:BorrowerComponent},

       //Loan Booking
       { path: 'loanbookmaster', component:LoanbookComponent},
       { path: 'repaymentmaster', component:RepaymentComponent},

       //MIS Reports
       { path: 'borrowerreport', component:BorrowerReportComponent},
       { path: 'loanbookingreport', component:LaonbookedReportComponent},
       
      //  Profile,
       { path: 'profile', component:ProfileComponent},
       
     ]
   }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
