import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../../../models/emplyee';
import { DialogService } from '../../../../services/dialog.service';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { EditemployeeComponent } from '../editemployee/editemployee.component';
import { ToastrService } from 'ngx-toastr';
import { MasterserviceService } from '../../../../services/masterservice.service';
import { NavServiceService } from '../../../../services/nav-service.service';

@Component({
  selector: 'app-employee',
  standalone: false,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit,AfterViewInit {
 
  displayedColumns: string[] = ['employeecode', 'userid', 'name', 'department', 'status', 'view', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  canAdd = false;
  canEdit = false;
  canView = false;
  canDelete = false;

  constructor(
    private masterService: MasterserviceService,
    private dialogService: DialogService,
    private toastr: ToastrService,
    private navService: NavServiceService
  ) {}

  ngOnInit(): void {
    this.navService.menuLoaded$.subscribe(loaded => {
      if (loaded) {
        this.canAdd = this.navService.hasPermission(1, 'ADD');
        this.canEdit = this.navService.hasPermission(1, 'EDIT');
        this.canView = this.navService.hasPermission(1, 'VIEW');
        this.canDelete = this.navService.hasPermission(1, 'DELETE');
      }
    });
    this.loadEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadEmployees(): void {
    this.masterService.getAllEmployees().subscribe({
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
    this.getEmployeeById(employee, true);
  }

  onEdit(employee: Employee): void {
    this.getEmployeeById(employee, false);
  }

  getEmployeeById(employee: any, isViewOnly: boolean): void {
    this.masterService.getEmployee(employee.employeeid).subscribe({
      next: (response: any) => {
        console.log('Employee By ID for Edit:', response.employee);
        this.openEditDialog(response.employee, isViewOnly);
      },
      error: (error) => {
         const errorMessage = error.error?.message || error.error || 'Failed to fetch enmployee';
        this.toastr.error(errorMessage, 'Error');
      }
    });
  }

  onDelete(employee: Employee): void {
    const message = `Delete Employee ${employee.name}?`;

    this.dialogService.confirm(message, 'Delete Employee').subscribe((confirmed) => {
   
      if (confirmed) {
        this.masterService.deleteEmployee(employee.employeeid!).subscribe({
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
