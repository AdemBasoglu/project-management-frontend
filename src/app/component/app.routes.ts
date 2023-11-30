import {Routes} from '@angular/router';
import {BoardComponent} from './board/board.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'board', component: BoardComponent},

];
