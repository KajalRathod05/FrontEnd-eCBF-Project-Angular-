import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-items';

@Injectable({
  providedIn: 'root'
})
export class NavServiceService {

  menuItems: MenuItem[] = [
    { title: 'Home', icon: 'dashboard', route: '/pages/dashboard' },
    {
      title: 'System Admin',
      icon: 'admin_panel_settings',
      children: [
        { title: 'Employee', icon: 'badge', route: '/pages/employee' },
        { title: 'Role Rights', icon: 'security', route: '/pages/rolerights' },
        { title: 'Commodity', icon: 'inventory_2', route: '/pages/commodity' },
        {
          title: 'Demography',
          icon: 'map',
          children: [
            { title: 'Country', route: '/pages/demography/country' },
            { title: 'State', route: '/pages/demography/state' },
            { title: 'District', route: '/pages/demography/district' },
            { title: 'Location', route: '/pages/demography/location' }
          ]
        }
      ]
    },
    { title: 'Borrower', icon: 'person', route: '/pages/borrower' },
    { title: 'Loan Booking', icon: 'request_quote', route: '/pages/loan' },
    { title: 'MIS Reports', icon: 'analytics', route: '/pages/mis-reports' },
    { title: 'Profile', icon: 'account_box', route: '/pages/profile' }
  ];
}
