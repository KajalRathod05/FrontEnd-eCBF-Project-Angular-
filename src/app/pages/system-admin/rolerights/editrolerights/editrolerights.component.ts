import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterserviceService } from '../../../../services/masterservice.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterDialogData } from '../../../../services/dialog.service';

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
  selector: 'app-editrolerights',
  standalone: false,
  templateUrl: './editrolerights.component.html',
  styleUrl: './editrolerights.component.scss'
})
export class EditrolerightsComponent implements OnInit {

  roleRightsForm!: FormGroup;
  isLoading = false;
  isViewOnly = false;

  displayedColumns: string[] = ['mastername', 'add', 'edit', 'view', 'delete'];
  moduleList: ModuleMaster[] = [];

  constructor(
    private fb: FormBuilder,
    private masterService: MasterserviceService,
    private toastr: ToastrService,
    @Optional() public dialogRef: MatDialogRef<EditrolerightsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: MasterDialogData
  ) {}

  ngOnInit(): void {
    this.isViewOnly = !!this.dialogData?.isViewOnly;
    this.initForm();
    this.loadModules();

    // if (this.dialogData?.data) {
    //   this.patchRoleRightsData(this.dialogData.data);
    // }

    if (this.isViewOnly) {
      this.roleRightsForm.disable();
    }
  }

  initForm(): void {
    this.roleRightsForm = this.fb.group({
      roleid: [null],
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
    this.modules.clear();
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

  patchRoleRightsData(roleRight: any): void {
    this.roleRightsForm.patchValue({
      roleid: roleRight.roleid,
      rolecode: roleRight.rolecode,
      rolename: roleRight.rolename,
      status: roleRight.status,
      remarks: roleRight.remarks
    });

    const userRights =
      roleRight.UserRightsResDTO ||
      roleRight.UserRightsDTO ||
      roleRight.userRightsMST ||
      [];

    this.modules.controls.forEach((moduleControl, moduleIndex) => {
      const moduleId = moduleControl.get('moduleid')?.value;
      const mastersArray = this.getMastersArray(moduleIndex);
      let moduleHasPermission = false;

      mastersArray.controls.forEach(masterControl => {
        //const masterName = masterControl.get('mastername')?.value;
        const pageTypeId = masterControl.get('pagetypeid')?.value;

        const existingRight = userRights.find((right: any) =>
          //Number(right.moduleid) === Number(moduleId) &&
           Number(right.pagetypeid) === Number(pageTypeId)

        );
        

        if (existingRight) {
          const add = Number(existingRight.addopn) === 1;
          const edit = Number(existingRight.editopn) === 1;
          const view = Number(existingRight.viewopn) === 1;
          const deleteOp = Number(existingRight.deleteopn) === 1;

          masterControl.patchValue({
            addopn: add,
            editopn: edit,
            viewopn: view,
            deleteopn: deleteOp
          });

          if (add || edit || view || deleteOp) {
            moduleHasPermission = true;
          }
        }
      });

      moduleControl.patchValue({
        isSelected: moduleHasPermission
      });
    });
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

    const formData = this.roleRightsForm.getRawValue();
    const userRightsMSTPayload: any[] = [];

    formData.modules.forEach((mod: any) => {
      mod.masters.forEach((m: any) => {
        const hasPermission =
          m.addopn ||
          m.editopn ||
          m.viewopn ||
          m.deleteopn;

        if (hasPermission) {
          userRightsMSTPayload.push({
            moduleid: mod.moduleid,
            pagetypeid: m.pagetypeid,
            mastername: m.mastername,
            addopn: m.addopn ? 1 : 0,
            editopn: m.editopn ? 1 : 0,
            viewopn: m.viewopn ? 1 : 0,
            deleteopn: m.deleteopn ? 1 : 0
          });
        }
      });
    });

    const payload = {
      roleid: formData.roleid,
      rolecode: formData.rolecode,
      rolename: formData.rolename,
      status: formData.status,
      remarks: formData.remarks,
      UserRightsDTO: userRightsMSTPayload
    };

    this.masterService.updateRoleRights(formData.roleid, payload).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.toastr.success(
          response.message || 'Role rights updated successfully',
          'Success'
        );
        this.dialogRef?.close(true);
      },
      error: (error) => {
        this.isLoading = false;
        const errorMessage =
          error.error?.message ||
          error.error ||
          'Failed to update role rights';

        this.toastr.error(errorMessage, 'Error');
      }
    });
  }

  onReset(): void {
    if (this.dialogData?.data) {
      this.patchRoleRightsData(this.dialogData.data);
    }
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

      if (this.dialogData?.data) {
        this.patchRoleRightsData(this.dialogData.data);
      }
      if (this.isViewOnly) {
        this.roleRightsForm.disable();
      }
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
