import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardService} from "../../../services/board.service";
import {Router} from "@angular/router";
import {Board} from "../../../interfaces/Board";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-board-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './board-edit.component.html',
  styleUrl: './board-edit.component.css'
})
export class BoardEditComponent implements OnInit {
  board: Board = {
    id: 0,
    name: '',
    project: {
      id: 0,
      name: ''
    }
  };

  constructor(private router: Router, private boardService: BoardService) {
  }

  ngOnInit(): void {
    const boardId = this.boardService.getBoardById(this.board.id);
    boardId.subscribe(
      (board) => {
        this.board = board
      }
    );
  }

  saveBoard(): void {
    this.boardService.updateBoard(this.board, this.board.id).subscribe(  {
      next: (updatedBoard) => this.router.navigate(['/boards']),
      error: (error) => console.log(error)
      });
  }


  cancel(): void {
    this.router.navigate(['/boards']);
  }


}
