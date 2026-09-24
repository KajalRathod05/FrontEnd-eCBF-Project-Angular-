import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './layouts/layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customers/customer/customer.component';
import { AddcustomerComponent } from './customers/addcustomer/addcustomer.component';
import { ProfileComponent } from './profile/profile.component';
import { AddeditcustomerComponent } from './customers/addeditcustomer/addeditcustomer.component';
import { CustomerActTrackerComponent } from './customers/customer-act-tracker/customer-act-tracker.component';
import { EditcustomerComponent } from './customers/editcustomer/editcustomer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { EmployeeComponent } from './system-admin/employee/employee/employee.component';
import { AddemployeeComponent } from './system-admin/employee/addemployee/addemployee.component';
import { EditemployeeComponent } from './system-admin/employee/editemployee/editemployee.component';
import { HeaderComponent } from './layouts/header/header.component';
import { RolerightsComponent } from './system-admin/rolerights/rolerights/rolerights.component';
import { AddrolerightsComponent } from './system-admin/rolerights/addrolerights/addrolerights.component';
import { EditrolerightsComponent } from './system-admin/rolerights/editrolerights/editrolerights.component';
import { CommodityComponent } from './system-admin/commodity/commodity/commodity.component';
import { CountryComponent } from './system-admin/demography/country/country/country.component';
import { AddcommodityComponent } from './system-admin/commodity/addcommodity/addcommodity.component';
import { AddcountryComponent } from './system-admin/demography/country/addcountry/addcountry.component';
import { EditcommodityComponent } from './system-admin/commodity/editcommodity/editcommodity.component';
import { EditcountryComponent } from './system-admin/demography/country/editcountry/editcountry.component';
import { DistrictComponent } from './system-admin/demography/district/district/district.component';
import { AdddistrictComponent } from './system-admin/demography/district/adddistrict/adddistrict.component';
import { EditdistrictComponent } from './system-admin/demography/district/editdistrict/editdistrict.component';
import { StateComponent } from './system-admin/demography/state/state/state.component';
import { LocationComponent } from './system-admin/demography/location/location/location.component';
import { AddlocationComponent } from './system-admin/demography/location/addlocation/addlocation.component';
import { EditstateComponent } from './system-admin/demography/state/editstate/editstate.component';
import { EditlocationComponent } from './system-admin/demography/location/editlocation/editlocation.component';


@NgModule({
  declarations: [
    LayoutComponent,
    CustomerComponent,
    AddcustomerComponent,
    ProfileComponent,
    AddeditcustomerComponent,
    CustomerActTrackerComponent,
    EditcustomerComponent,
    SidebarComponent,
    EmployeeComponent,
    AddemployeeComponent,
    EditemployeeComponent,
    HeaderComponent,
    RolerightsComponent,
    AddrolerightsComponent,
    EditrolerightsComponent,
    CommodityComponent,
    CountryComponent,
    AddcommodityComponent,
    AddcountryComponent,
    EditcommodityComponent,
    EditcountryComponent,
    DistrictComponent,
    AdddistrictComponent,
    EditdistrictComponent,
    StateComponent,
    LocationComponent,
    AddlocationComponent,
    EditstateComponent,
    EditlocationComponent,
    
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
