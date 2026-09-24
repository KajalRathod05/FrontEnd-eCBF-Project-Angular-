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

const routes: Routes = [
   {path: '',
    component: LayoutComponent,
     children:[
       { path: 'dashboard',component:DashboardComponent},

       { path: 'customer',component:CustomerComponent},
       { path: 'addCustomer',component:AddcustomerComponent},
       { path: 'addeditcustomer', component: AddeditcustomerComponent},
       { path: 'editCustomer/:id',component:EditcustomerComponent},

       //System Admin
       { path: 'employee',component:EmployeeComponent},
       { path: 'rolerights',component:RolerightsComponent},
       { path: 'commodity',component:CommodityComponent},
       { path: 'demography/country',component:CountryComponent},
       { path: 'demography/state',component:StateComponent},
       { path: 'demography/district',component:DistrictComponent},
       { path: 'demography/location',component:LocationComponent},

       
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
