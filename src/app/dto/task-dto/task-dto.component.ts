import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
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
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './task-dto.component.html',
  styleUrl: './task-dto.component.css',
})
export class TaskDtoComponent {
  name = '';
  description = '';

  constructor(
    public dialogRef: DialogRef<TaskDialogData>,
    @Inject(DIALOG_DATA) public data: TaskDialogData
  ) {}
}
