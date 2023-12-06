import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../interfaces/Project';
import { Board } from '../../interfaces/Board';
import { BoardService } from '../../services/board.service';
import { UserService } from '../../services/user.service';
import { BoardComponent } from '../board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  Router,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'pm-project',
  standalone: true,
  imports: [BoardComponent, CdkDropList, DragDropModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  // Get route paramater.
  @Input('id') projectId = Number('');

  project: Project = {
    id: 0,
    name: '',
  };
  boards: Board[] = [];

  constructor(
    private projectService: ProjectService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    console.log('INIT PROJECT_ID ' + this.projectId);

    this.boardService.getBoardByProjectId(this.projectId).subscribe({
      next: (boards) => {
        this.boards = boards;
        console.log(this.boards);
      },
      error: (err) => console.log(err),
    });

    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        (this.project = project), console.log(this.project);
      },
    });
  }
}
