import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { RoomComponent } from './room/room.component'


const routes:Routes = [
  { path:'room', component:RoomComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
