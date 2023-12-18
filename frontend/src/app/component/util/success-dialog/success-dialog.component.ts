import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-success-dialog',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">Fechar</button>
    </div>
  `,
  styles: []
})
export class SuccessDialogComponent {

  constructor(
    public dialogRef:MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessDialoggData
  ) {}
}

export interface SuccessDialoggData {
  title: string;
  message: string;
}
