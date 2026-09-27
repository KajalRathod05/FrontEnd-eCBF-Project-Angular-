import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../../../services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { MasterserviceService } from '../../../../services/masterservice.service';
import { AddrolerightsComponent } from '../addrolerights/addrolerights.component';
import { EditrolerightsComponent } from '../editrolerights/editrolerights.component';

@Component({
  selector: 'app-rolerights',
  standalone: false,
  templateUrl: './rolerights.component.html',
  styleUrl: './rolerights.component.scss'
})
export class RolerightsComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['rolecode', 'rolename', 'status', 'view', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private masterService: MasterserviceService,
    private dialogService: DialogService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadRoleRights();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadRoleRights(): void {
    this.masterService.getRoleRights().subscribe({
      next: (response: any) => {
        console.log('Role Rights: ', response.roleRights);
        this.dataSource.data = response.roleRights;
      },
      error: (err) => console.error('Error fetching role rights:', err)
    });
  }

  // Opens Add Component
  onAdd(): void {
    this.dialogService.openMasterDialog(AddrolerightsComponent, {}).subscribe((result) => {
      if (result) this.loadRoleRights();
    });
  }

  // Opens Edit/View Component
  openEditDialog(roleRight: any, isViewOnly: boolean = false): void {
    this.dialogService
      .openMasterDialog(EditrolerightsComponent, {
        data: roleRight,
        isViewOnly: isViewOnly
      })
      .subscribe((result) => {
        if (result) this.loadRoleRights();
      });
  }

  onView(roleRight: any): void {
    this.openEditDialog(roleRight, true);
  }

  onEdit(roleRight: any): void {
    this.openEditDialog(roleRight, false);
  }

  onDelete(roleRight: any): void {
    const message = `Delete Role Right ${roleRight.rolename}?`;

    this.dialogService.confirm(message, 'Delete Role Right').subscribe((confirmed) => {
   
      if (confirmed) {
        this.masterService.deleteRoleRights(roleRight.roleid!).subscribe({
          next: (response :any) => {
            this.toastr.success(response.message, 'Success');
            this.loadRoleRights();
          },
          error: (error) => {
            const errorMessage = error.error?.message || error.error || 'Failed to delete role right';
            this.toastr.error(errorMessage, 'Error');
          }
        });
      }
    });
  }
}
