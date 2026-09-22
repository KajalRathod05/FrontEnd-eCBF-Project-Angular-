import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-editcustomer',
  standalone: false,
  templateUrl: './editcustomer.component.html',
  styleUrl: './editcustomer.component.scss'
})
export class EditcustomerComponent {

  customertempid!: number;
  mode = 'edit';
  isViewMode = false;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customertempid = Number(this.route.snapshot.paramMap.get('id'));

    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'edit';
      this.isViewMode = this.mode == 'view';
    });

    //this.loadCustomer();
  }

  loadCustomer(): void {
    this.customerService.getCustomerById(this.customertempid).subscribe({
      next: (response: any) => {
        console.log('Customer:', response);

        // Patch your customer form here
        // this.customerForm.patchValue(response.data);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load customer:', error);
      }
    });
  }

  updateCustomer(): void {
    if (this.isViewMode) {
      return;
    }

    // Update API call here
  }

  back(): void {
    this.router.navigate(['/pages/customer']);
  }
}
