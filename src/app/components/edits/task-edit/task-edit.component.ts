import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TaskLabel } from '../../../enums/TaskLabel';
import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';
import { Task } from '../../../interfaces/Task';
import { Board } from '../../../interfaces/Board';
import { User } from '../../../interfaces/User';
import { TaskService } from '../../../services/task.service';

export interface TaskEdit {
  id: number;
  name: string;
  description: string;
  createdDate: string;
  label: string;
  board: Board;
  users: User[];
}

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
})
export class TaskEditComponent {
  labels: typeof TaskLabel = TaskLabel;
  constructor(
    private taskService: TaskService,
    public dialogRef: DialogRef<TaskEdit>,
    @Inject(DIALOG_DATA) public data: TaskEdit
  ) {}

  delete(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe();
  }
}
