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

export interface TaskDialogData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-task-dto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './task-dto.component.html',
  styleUrl: './task-dto.component.css',
})
export class TaskDialogComponent {
  constructor(
    public dialogRef: DialogRef<TaskDialogData>,
    @Inject(DIALOG_DATA) public data: TaskDialogData
  ) {}
}
