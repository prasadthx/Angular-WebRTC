import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs/internal/observable/from';
import { RoomComponent } from './room/room.component';
import { AuthGuard } from '../auth/helpers/auth.guard';
import { NewmeetingComponent } from './newmeeting/newmeeting.component';
import { JoinmeetingComponent } from './joinmeeting/joinmeeting.component'


const routes:Routes = [
  { path:'room', component: NewmeetingComponent, canActivate:[AuthGuard]},
  { path:'meeting/joinmeeting',component:JoinmeetingComponent, canActivate:[AuthGuard]},
  { path:'meeting/newmeeting',component:NewmeetingComponent, canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
