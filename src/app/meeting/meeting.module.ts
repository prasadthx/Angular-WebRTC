import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { SignalingService} from "./signaling.service";
import {MeetingRoutingModule} from "./meeting-routing.module";



@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    MeetingRoutingModule
  ],
  providers: [SignalingService],
  exports: [
    RoomComponent
  ]
})
export class MeetingModule { }
