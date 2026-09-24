import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MasterDialogData } from '../../../../services/dialog.service';
import { EmployeeService } from '../../../../services/employee.service';

@Component({
  selector: 'app-editemployee',
  standalone: false,
  templateUrl: './editemployee.component.html',
  styleUrl: './editemployee.component.scss'
})
export class EditemployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  isLoading = false;
  isViewOnly = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    @Optional() public dialogRef: MatDialogRef<EditemployeeComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: MasterDialogData
  ) {}

  ngOnInit(): void {
    this.isViewOnly = !!this.dialogData?.isViewOnly;
    this.loadEmployees();

    if (this.dialogData?.data) {
      this.employeeForm.patchValue(this.dialogData.data);
    }

    if (this.isViewOnly) {
      this.employeeForm.disable();
    }
  }

  loadEmployees(): void {
    this.employeeForm = this.fb.group({
      employeeid: [null],
      name: ['', Validators.required],
      employeecode: ['', Validators.required],
      branch: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      // transactionrole: this.fb.group({
      //   maker: [false],
      //   reviewer: [false],
      //   checker: [false]
      // }),
      employeetype: ['', Validators.required],
      grade: ['Select'],
      userclassification: ['Staff'],
      userid: ['', Validators.required],
      mobileno: [''],
      emailid: ['', [Validators.required, Validators.email]],
      expirydate: ['', Validators.required],
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
    const updateData = this.employeeForm.getRawValue();

    this.employeeService.updateEmployee(updateData.employeeid, updateData).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.toastr.success(response.message, 'Success');
        this.dialogRef?.close(true);
      },
      error: (error) => {
        this.isLoading = false;
         const errorMessage = error.error?.message || error.error || 'Failed to Edit Employee';
         this.toastr.error(errorMessage, 'Error');
      }
    });
  }

  onReset(): void {
    if (this.dialogData?.data) {
      this.employeeForm.reset(this.dialogData.data);
    }
  }

  onCancel(): void {
    this.dialogRef?.close(false);
  }
}
