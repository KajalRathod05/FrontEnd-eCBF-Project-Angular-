import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../services/employee.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addemployee',
  standalone: false,
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.scss'
})
export class AddemployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    @Optional() public dialogRef: MatDialogRef<AddemployeeComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      employeecode: ['', Validators.required],
      branch: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      // transactionrole: this.fb.group({
      //   maker: [true],
      //   reviewer: [false],
      //   checker: [false]
      // }),
      employeetype: ['BPRG', Validators.required],
      grade: ['Select'],
      userclassification: ['Staff'],
      userid: ['', Validators.required],
      mobileno: [''],
      emailid: ['', [Validators.required, Validators.email]],
      expirydate: [new Date(2049, 2, 31), Validators.required],
      status: ['Active', Validators.required],
      remarks: ['']
    });
  }

  onSubmit(): void {
  if (this.employeeForm.invalid) {
    this.employeeForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  const employeeData = this.employeeForm.getRawValue();

  this.employeeService.addEmployee(employeeData).subscribe({
    next: (response: any) => {
      this.isLoading = false;
      this.toastr.success(response.message, 'Success');
      this.dialogRef?.close(true);
    },
    error: (error) => {
      this.isLoading = false;
      const errorMessage = error.error?.message || error.error || 'Failed to add employee';
      this.toastr.error(errorMessage, 'Validation Error');
    }
  });
}

  onReset(): void {
    this.employeeForm.reset({
      transactionrole: { maker: true, reviewer: false, checker: false },
      employeetype: 'BPRG',
      grade: 'Select',
      userclassification: 'Staff',
      status: 'Active',
      expirydate: new Date(2049, 2, 31)
    });
  }

  onCancel(): void {
    this.dialogRef?.close(false);
  }
}
