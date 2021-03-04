import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from "./auth/auth.module";
import { MeetingModule } from "./meeting/meeting.module";
import { AppComponent } from './app.component';
import {TestService} from './test.service';
import {RouterModule} from "@angular/router";
import { GetstartedComponent } from "./getstarted/getstarted.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    GetstartedComponent
  ],
  imports: [
    BrowserModule,
    MeetingModule,
    RouterModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
