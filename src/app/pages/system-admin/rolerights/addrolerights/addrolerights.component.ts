import { Component, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterserviceService } from '../../../../services/masterservice.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


export interface MasterItem {
  pagetypeid: number;
  mastername: string;
}

export interface ModuleMaster {
  moduleid: number;
  modulename: string;
  masters: MasterItem[];
}

@Component({
  selector: 'app-addrolerights',
  standalone: false,
  templateUrl: './addrolerights.component.html',
  styleUrl: './addrolerights.component.scss'
})
export class AddrolerightsComponent {

  roleRightsForm!: FormGroup;
  isLoading = false;
  displayedColumns: string[] = ['mastername', 'add', 'edit', 'view', 'delete'];
  pagetypeid!: number;
  moduleList: ModuleMaster[] = [];
  

  constructor(
    private fb: FormBuilder,
    private masterService: MasterserviceService,
    private toastr: ToastrService,
    @Optional() public dialogRef: MatDialogRef<AddrolerightsComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadModules();
  }

  initForm(): void {
    this.roleRightsForm = this.fb.group({
      rolecode: ['', Validators.required],
      rolename: ['', Validators.required],
      status: ['Active', Validators.required],
      remarks: [''],
      modules: this.fb.array([])
    });

  }

  get modules(): FormArray {
    return this.roleRightsForm.get('modules') as FormArray;
  }

  

  populateModules(): void {
    this.moduleList.forEach(mod => {
      const moduleGroup = this.fb.group({
        moduleid: [mod.moduleid],
        modulename: [mod.modulename],
        isSelected: [false],
        masters: this.fb.array([])
      });

      const mastersArray = moduleGroup.get('masters') as FormArray;
      mod.masters.forEach(m => {
        mastersArray.push(
          this.fb.group({
            pagetypeid: [m.pagetypeid],
            mastername: [m.mastername],
            addopn: [false],
            editopn: [false],
            viewopn: [false],
            deleteopn: [false]
          })
        );
      });

      this.modules.push(moduleGroup);
    });
  }

  getMastersArray(moduleIndex: number): FormArray {
    return this.modules.at(moduleIndex).get('masters') as FormArray;
  }

  onModuleToggle(moduleIndex: number): void {
    const moduleGroup = this.modules.at(moduleIndex);
    const isSelected = moduleGroup.get('isSelected')?.value;

    if (!isSelected) {
      const mastersArray = this.getMastersArray(moduleIndex);
      mastersArray.controls.forEach(control => {
        control.patchValue({
          addopn: false,
          editopn: false,
          viewopn: false,
          deleteopn: false
        });
      });
    }
  }

  onSubmit(): void {
  if (this.roleRightsForm.invalid) {
    this.roleRightsForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  const rolerightsData = this.roleRightsForm.getRawValue();
  const userRightsMSTPayload: any[] = [];

    rolerightsData.modules.forEach((mod: any) => {
      mod.masters.forEach((m: any) => {
      const hasPermission = m.addopn || m.editopn || m.viewopn || m.deleteopn;

      if (hasPermission) {
        userRightsMSTPayload.push({
          moduleid: mod.moduleid,
          mastername: m.mastername,
          pagetypeid: m.pagetypeid,
          addopn: m.addopn ? 1 : 0,
          editopn: m.editopn ? 1 : 0,
          viewopn: m.viewopn ? 1 : 0,
          deleteopn: m.deleteopn ? 1 : 0
        });
      }
    });   
  });
  const payload = {
    rolecode: rolerightsData.rolecode,
    rolename: rolerightsData.rolename,
    status: rolerightsData.status,
    remarks: rolerightsData.remarks,
    UserRightsDTO: userRightsMSTPayload
  };
  console.log('Payload to be sent:', payload);

  this.masterService.addRoleRights(payload).subscribe({
    next: (response: any) => {
      this.isLoading = false;
      this.toastr.success(response.message || 'Role rights added successfully', 'Success');
      this.dialogRef?.close(true);
    },
    error: (error) => {
      this.isLoading = false;
      const errorMessage = error.error?.message || error.error || 'Failed to add role rights';
      this.toastr.error(errorMessage, 'Error');
    }
  });
}

onReset(): void {
  this.roleRightsForm.reset({
    rolecode: '',
    rolename: '',
    status: 'Active',
    remarks: ''
  });

  this.modules.controls.forEach((modGroup, index) => {
    modGroup.patchValue({ isSelected: false });
    this.onModuleToggle(index);
  });
}

onCancel(): void {
  this.dialogRef?.close(false);
}

loadModules() {
  this.isLoading = true;

  this.masterService.getModulesWithMasters().subscribe({
    next:(response: any) => {

      this.moduleList = response.modules;
      console.log('Modules with Masters: ', this.moduleList);
      this.populateModules();
      this.isLoading = false;
    },
    error: (error) => {
      this.isLoading = false;
      const message = error.error?.message || 'Failed to load modules and masters';
      this.toastr.error(message, 'Error');
    }
  });
}


}
