import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { TaskLabel } from '../../enums/TaskLabel';
import {
  CdkDrag,
  DragDropModule,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';
import {
  TaskEdit,
  TaskEditComponent,
} from '../edits/task-edit/task-edit.component';
import { TaskService } from '../../services/task.service';
import { User } from '../../interfaces/User';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Board } from '../../interfaces/Board';

@Component({
  selector: 'pm-task',
  standalone: true,
  imports: [
    CdkDrag,
    DragDropModule,
    MatIconModule,
    MatTooltipModule,
    CdkDragPlaceholder,
    MatButtonModule,
    DialogModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  @Input() task: Task = {
    id: 0,
    name: '',
    description: '',
    createdDate: '',
    label: TaskLabel.DEFAULT,
    board: {
      id: 0,
      name: '',
      project: {
        id: 0,
        name: '',
      },
    },
  };

  color = '';
  taskUsers: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private taskService: TaskService,
    public dialog: Dialog
  ) {}

  ngOnInit(): void {
    this.taskService.getTaskById(this.task.id).subscribe({
      next: (task) => {
        (this.task = task),
          this.updateTaskUsers(),
          this.updateColor(this.task),
          console.log(this.task.board.name);
      },
      error: (err) => console.log(err),
    });

    setTimeout(() => {
      this.updateTask();
    }, 200);
  }

  openDialog() {
    const dialogRef = this.dialog.open<TaskEdit>(TaskEditComponent, {
      width: '500px',
      data: {
        id: this.task.id,
        name: this.task.name,
        description: this.task.description,
        createdDate: this.task.createdDate,
        label: this.task.label,
        board: this.task.board,
        users: this.taskUsers,
      },
    });

    dialogRef.closed.subscribe((result) => {
      let board: Board = {
        id: 0,
        name: '',
        project: {
          id: 0,
          name: '',
        },
      };

      if (result) {
        this.taskService.updateTask(result, this.task.id).subscribe({
          next: (task) => {
            (this.task = task),
              (this.task.board = board),
              this.updateColor(task);
          },
          error: (err) => console.log(err),
        });
      }
    });
  }

  updateTaskUsers() {
    this.userService.getAllUsersByTaskId(this.task.id).subscribe({
      next: (users) => (this.taskUsers = users),
      error: (err) => console.log(err),
    });
  }

  updateTask() {
    this.taskService.getTaskById(this.task.id).subscribe({
      next: (task) => (this.task = task),
      error: (err) => console.log(err),
    });
  }

  updateColor(task: Task) {
    this.color =
      task.label.toLowerCase() === 'default'
        ? 'grey'
        : this.task.label.toLowerCase();
  }
}
