import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';

export interface BoardDialogData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-board-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './board-dialog.component.html',
  styleUrl: './board-dialog.component.css',
})
export class BoardDialogComponent {
  constructor(
    public dialogRef: DialogRef<BoardDialogData>,
    @Inject(DIALOG_DATA) public data: BoardDialogData
  ) {}
}
