import { Component, EventEmitter, Input, OnInit ,Output,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomerService } from '../../../auth/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit{

   @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedTab = 0;
  searchText = '';
  selectedLoanType = 'all';

  displayedColumns = [
    'customerName',
    'loanType',
    'view',
    'edit',
    'status',
    'action'
  ];

  dataSource = new MatTableDataSource<any>([]);

  customers: any[] = [];

  loanTypes = [
    { id: 1, name: 'Personal Loan' },
    { id: 2, name: 'Home Loan' },
    { id: 3, name: 'Vehicle Loan' },
    { id: 4, name: 'Education Loan' }
  ];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    //this.loadCustomers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (response: any[]) => {
        console.log('Customer response:', response);

        this.customers = response;
        this.dataSource.data = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load customers:', error);

        if (error.status === 0) {
          console.error('Unable to connect to backend.');
        } else {
          console.error('Something went wrong while loading customers.');
        }
      }
    });
  }

  searchCustomer(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterCustomers(): void {
    if (this.selectedLoanType === 'all') {
      this.dataSource.data = this.customers;
    } else {
      this.dataSource.data = this.customers.filter(
        customer => customer.loantypeid === Number(this.selectedLoanType)
      );
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatus(approveflag: number): string {
    switch (approveflag) {
      case 1:
        return 'Approved';
      case 2:
        return 'Rejected';
      case 3:
        return 'Under Review';
      case 0:
        return 'Pending';
      default:
        return 'Unknown';
    }
  }

  tabChanged(event: any): void {
    this.selectedTab = event.index;
  }

  
   
}
