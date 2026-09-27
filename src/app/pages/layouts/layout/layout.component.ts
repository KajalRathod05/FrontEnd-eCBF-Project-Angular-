import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavServiceService } from '../../../services/nav-service.service';
import { MenuItem } from '../../../models/menu-items';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  menuItems: MenuItem[] = [];
  selectedModule: MenuItem | null = null;
  isMobile = false;
  username: string | null = '';

  constructor(
    private navService: NavServiceService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.menuItems = this.navService.menuItems;

    // Default to the first module if available
    if (this.menuItems.length > 0) {
      this.selectedModule = this.menuItems[0];
    }

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  onModuleSelect(moduleItem: MenuItem): void {
    this.selectedModule = moduleItem;
    if (moduleItem.route) {
      this.router.navigate([moduleItem.route]);
    }
  }

  logout(): void {
    const message = `Are you sure you want to logout?`;
    this.dialogService.confirm(message, 'Logout').subscribe((confirmed) => {
       if (confirmed) {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
   });
  }
}
