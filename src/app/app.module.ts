import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthModule } from './auth/auth.module'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GetstartedComponent } from './getstarted/getstarted.component';
import { MeetingModule} from "./meeting/meeting.module";
import {SignalingService} from "./meeting/signaling.service";

@NgModule({
  declarations: [
    AppComponent,
    GetstartedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    MeetingModule
  ],
  providers: [SignalingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
