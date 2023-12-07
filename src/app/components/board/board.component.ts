import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { Board } from '../../interfaces/Board';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../services/task.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';

import {
  CdkDragDrop,
  CdkDropList,
  transferArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { BoardService } from '../../services/board.service';

import { TaskLabel } from '../../enums/TaskLabel';
import {
  TaskDialogComponent,
  TaskDialogData,
} from '../dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'pm-board',
  standalone: true,
  imports: [
    TaskComponent,
    CdkDropList,
    MatIconModule,
    FormsModule,
    DialogModule,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  @Input() board: Board = {
    id: 0,
    name: '',
    project: {
      id: 0,
      name: '',
    },
  };
  tasks: Task[] = [];

  constructor(private taskService: TaskService, public dialog: Dialog) {}

  ngOnInit(): void {
    console.log(`Inint board with ID: ${this.board.id}`);
    this.updateTasks(this.board.id);
  }

  drop(event: CdkDragDrop<Task[]>, boardId: number) {
    const taskId = event.previousContainer.data[event.previousIndex].id;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.taskService.changeBoard(Number(taskId), boardId).subscribe();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<TaskDialogData>(TaskDialogComponent, {
      width: '500px',
      data: { name: '', description: '' },
    });

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.taskService
          .addTask(result.name, result.description, this.board.id)
          .subscribe({
            next: (task) => this.tasks.push(task),
            error: (err) => console.log(err),
          });
      }
    });
  }

  updateTasks(boardID: number) {
    this.taskService.getTaskByBoardId(boardID).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => console.log(err),
    });
  }
}
