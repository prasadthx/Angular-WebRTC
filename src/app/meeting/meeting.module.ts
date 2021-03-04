import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { MeetingRoutingModule} from "./meeting-routing.module";
import { SignalingService } from "./signaling.service";


@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    MeetingRoutingModule
  ],
  providers: [SignalingService],
})
export class MeetingModule { }
