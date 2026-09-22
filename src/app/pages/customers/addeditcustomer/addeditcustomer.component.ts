import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../../../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addeditcustomer',
  standalone: false,
  templateUrl: './addeditcustomer.component.html',
  styleUrl: './addeditcustomer.component.scss'
})
export class AddeditcustomerComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedTab = 0;
  searchText = '';
  selectedLoanType = 'all';
  dataSource = new MatTableDataSource<any>([]);
  customers: any[] = [];

  displayedColumns = [
    'customerName',
    'loanType',
    'view',
    'edit',
    'status',
    'action'
  ];

  loanTypes = [
    { id: 1, name: 'Personal Loan' },
    { id: 2, name: 'Home Loan' },
    { id: 3, name: 'Vehicle Loan' },
    { id: 4, name: 'Education Loan' }
  ];

  getLoanTypeName(loantypeid: number): string {
    const loanType = this.loanTypes.find(
      loan => loan.id == Number(loantypeid)
    );
    return loanType ? loanType.name : 'Unknown';
  }

  constructor(
    private customerService: CustomerService,
    private router:Router) {}

  ngOnInit() {
    this.loadCustomers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCustomers(){
    this.customerService.getTempCustomers().subscribe({
      next: (response: any) => {
        console.log('Customer response:', response);

         console.log('Customer API Response:', response);

          if (response.status == 'success') {
            this.customers = response.data;
            this.dataSource.data = response.data;
          }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load customers:', error);

        if (error.status == 0) {
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
        customer => customer.loantypeid == Number(this.selectedLoanType)
      );
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getActiveInactive( deleteflag : number):string{
    switch (deleteflag) {
      case 1:
        return 'Inactive';
      case 0:
        return 'Active';
      default:
        return 'Unknown';
    }
  }
  getStatus(approveflag: number): string {
    switch (approveflag) {
      case 1:
        return 'Approved';
      case 2:
        return 'Send for Approve';
      case 3:
        return 'Rejected';
      case 0:
        return 'Pending';
      default:
        return 'Unknown';
    }
  }

  tabChanged(event: any): void {
    this.selectedTab = event.index;
  }

  addCustomer(){
     this.router.navigate(['/pages/addCustomer']);
  }

  viewCustomer(customertempid: number): void {
    this.router.navigate(['/pages/editCustomer', customertempid], {
      queryParams: { mode: 'view' }
    });
  }

  editCustomer(customertempid: number): void {
    this.router.navigate(['/pages/editCustomer', customertempid], {
      queryParams: { mode: 'edit' }
    });
  }
}
