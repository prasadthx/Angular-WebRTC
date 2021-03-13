import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { SignalingService} from "./signaling.service";
import {MeetingRoutingModule} from "./meeting-routing.module";
import { NewmeetingComponent } from './newmeeting/newmeeting.component';
import { JoinmeetingComponent } from './joinmeeting/joinmeeting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RoomComponent, NewmeetingComponent, JoinmeetingComponent],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton:true,
      newestOnTop: true,
      tapToDismiss:true,
    })
  ],
  providers: [SignalingService],
  exports: [
    RoomComponent
  ]
})
export class MeetingModule { }
