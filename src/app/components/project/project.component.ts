import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../interfaces/Project';
import { Board } from '../../interfaces/Board';
import { BoardService } from '../../services/board.service';
import { UserService } from '../../services/user.service';
import { BoardComponent } from '../board/board.component';
import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'pm-project',
  standalone: true,
  imports: [BoardComponent, CdkDropList],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  // @Input() project: Project = {
  //   id: 0,
  //   name: '',
  // };

  @Input() projectId = 0;

  boards: Board[] = [];

  constructor(
    private userService: UserService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    console.log('project init');
    console.log('PROJECT_ID ' + this.projectId);

    this.boardService.getBoardByProjectId(this.projectId).subscribe({
      next: (boards) => {
        this.boards = boards;
        console.log(this.boards);
      },
      error: (err) => console.log(err),
    });
  }
}
