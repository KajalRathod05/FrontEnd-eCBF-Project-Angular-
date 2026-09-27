import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

export interface MasterDialogData<T = any> {
  data?: T;
  isViewOnly?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}


  openMasterDialog<T, D = MasterDialogData, R = any>(
    component: ComponentType<T>,
    dialogData?: D,
    width: string = '900px'
  ): Observable<R | undefined> {
    const dialogRef: MatDialogRef<T, R> = this.dialog.open(component, {
      width,
      maxHeight: '90vh',
      disableClose: false,
      data: dialogData
    });

    return dialogRef.afterClosed();
  }

  confirm(message: string, title: string = 'Confirm'): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { title, message }
    });

    return dialogRef.afterClosed();
  }
}
