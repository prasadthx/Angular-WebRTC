import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GetstartedComponent } from './getstarted/getstarted.component';

@NgModule({
  declarations: [
    AppComponent,
    GetstartedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
