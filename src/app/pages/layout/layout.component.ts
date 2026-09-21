import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  isMobile = false;
  username: string | null = '';
  email : string | null ='';

  constructor(private breakpointObserver: BreakpointObserver,private router:Router) {}

  ngOnInit(): void {
    // Get username from sessionStorage
    this.username = sessionStorage.getItem('username');
    this.email = sessionStorage.getItem('email');

    // Responsive check
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  logout() {
    sessionStorage.clear();
    if (confirm('Are you sure you want to logout?')) {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
    console.log('Logged out');
  }
}
