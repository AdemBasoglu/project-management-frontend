import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../interfaces/Project';
import { Board } from '../../interfaces/Board';
import { BoardService } from '../../services/board.service';
import { UserService } from '../../services/user.service';
import { BoardComponent } from '../board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
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
import { Dialog } from '@angular/cdk/dialog';
import {
  BoardDialogComponent,
  BoardDialogData,
} from '../dialogs/board-dialog/board-dialog.component';

@Component({
  selector: 'pm-project',
  standalone: true,
  imports: [
    SidebarComponent,
    BoardComponent,
    CdkDropList,
    DragDropModule,
    MatIconModule,
  ],
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
    private boardService: BoardService,
    public dialog: Dialog
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

  openDialog(): void {
    const dialogRef = this.dialog.open<BoardDialogData>(BoardDialogComponent, {
      width: '500px',
      data: { name: '', description: '' },
    });

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.boardService.addBoard(result.name, this.projectId).subscribe({
          next: (board) => this.boards.push(board),
          error: (err) => console.log(err),
        });
      }
    });
  }
}
