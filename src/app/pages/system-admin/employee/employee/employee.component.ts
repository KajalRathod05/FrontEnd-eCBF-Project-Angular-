import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../../../models/emplyee';
import { EmployeeService } from '../../../../services/employee.service';
import { DialogService } from '../../../../services/dialog.service';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { EditemployeeComponent } from '../editemployee/editemployee.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  standalone: false,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit,AfterViewInit {
 
  displayedColumns: string[] = ['employeecode', 'name', 'department', 'status', 'view', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private dialogService: DialogService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.employees;
      },
      error: (err) => console.error('Error fetching employees:', err)
    });
  }

  // Opens Add Component
  onAdd(): void {
    this.dialogService.openMasterDialog(AddemployeeComponent, {}).subscribe((result) => {
      if (result) this.loadEmployees();
    });
  }

  // Opens Edit/View Component
  openEditDialog(employee: Employee, isViewOnly: boolean = false): void {
    this.dialogService
      .openMasterDialog(EditemployeeComponent, {
        data: employee,
        isViewOnly: isViewOnly
      })
      .subscribe((result) => {
        if (result) this.loadEmployees();
      });
  }

  onView(employee: Employee): void {
    this.openEditDialog(employee, true);
  }

  onEdit(employee: Employee): void {
    this.openEditDialog(employee, false);
  }

  onDelete(employee: Employee): void {
    const message = `Delete Employee ${employee.name}?`;

    this.dialogService.confirm(message, 'Delete Employee').subscribe((confirmed) => {
   
      if (confirmed) {
        this.employeeService.deleteEmployee(employee.employeeid!).subscribe({
          next: (response :any) => {
            this.toastr.success(response.message, 'Success');
            this.loadEmployees();
          },
          error: (error) => {
            const errorMessage = error.error?.message || error.error || 'Failed to delete employee';
            this.toastr.error(errorMessage, 'Error');
          }
        });
      }
    });
  }
}
