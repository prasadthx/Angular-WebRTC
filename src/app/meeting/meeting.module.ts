import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { MeetingRoutingModule} from "./meeting-routing.module";


@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    MeetingRoutingModule
  ]
})
export class MeetingModule { }
