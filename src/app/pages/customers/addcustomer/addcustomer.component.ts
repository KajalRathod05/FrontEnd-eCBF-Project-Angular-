import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../auth/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcustomer',
  standalone: false,
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.scss'
})
export class AddcustomerComponent {

  customerForm!: FormGroup;
   isLoading: boolean = false;

    constructor(
      private fb: FormBuilder,
      private customerService: CustomerService,
      private toastr: ToastrService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.customerForm = this.fb.group({
        firstname: ['', [Validators.required, Validators.minLength(2)]],
        lastname: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        mobileno: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        locationid: ['', Validators.required],
        districtid: ['', Validators.required],
        stateid: ['', Validators.required],
        countryid: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
        income: ['', [Validators.required, Validators.min(1)]],
        loantypeid: ['', Validators.required]
      });
    }

    locations = [
      { id: 1, name: 'Pune' },
      { id: 2, name: 'Mumbai' },
      { id: 3, name: 'Satara' }
    ];

    districts = [
      { id: 1, name: 'Pune' },
      { id: 2, name: 'Satara' },
      { id: 3, name: 'Mumbai' }
    ];

    states = [
      { id: 1, name: 'Maharashtra' },
      { id: 2, name: 'Karnataka' },
      { id: 3, name: 'Gujarat' }
    ];

    countries = [
      { id: 1, name: 'India' },
      { id: 2, name: 'USA' },
      { id: 3, name: 'UK' }
    ];

    loanTypes = [
      { id: 1, name: 'Personal Loan' },
      { id: 2, name: 'Home Loan' },
      { id: 3, name: 'Vehicle Loan' },
      { id: 4, name: 'Education Loan' }
    ];

  onSubmit(): void {
      if (this.customerForm.invalid) {
        this.customerForm.markAllAsTouched();
        return;
      }

      this.isLoading = true;

      const customerData = this.customerForm.value;
      console.log('Customer Request:', customerData);

      this.customerService.addCustomer(customerData)
        .subscribe({
          next: (response: string) => {
            console.log('Customer response:', response);
            this.isLoading = false;

            this.toastr.success(response, 'Success');
            this.customerForm.reset();
            this.router.navigate(['/pages/addeditcustomer']);
          },
          error: (error: HttpErrorResponse) => {
            console.error('Customer addition failed:', error);
            this.isLoading = false;

            if (error.status == 400) {
              this.toastr.error(error.error, 'Invalid Data');
            } else if (error.status == 0) {
              this.toastr.error(
                'Unable to connect to server. Please check your backend.',
                'Connection Error'
              );
            } else {
              this.toastr.error(
                'Something went wrong. Please try again.',
                'Error'
              );
            }
          }
        });
    }

    resetForm(): void {
      this.customerForm.reset();
    }
}
