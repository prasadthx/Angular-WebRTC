import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CreatemeetingComponent } from './createmeeting/createmeeting.component';



@NgModule({
  declarations: [LoginComponent, SignupComponent, EditprofileComponent, CreatemeetingComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
