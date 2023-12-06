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
  constructor() {}
  ngOnInit(): void {
    console.log(`Task -> ${this.task.id} | ${this.task.name}`);
  }

  editTask() {}
}
