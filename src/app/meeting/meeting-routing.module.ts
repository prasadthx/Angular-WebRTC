import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs/internal/observable/from';
import { RoomComponent } from './room/room.component';
import { AuthGuard } from '../auth/helpers/auth.guard';


const routes:Routes = [
  { path:'room', component:RoomComponent, canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
