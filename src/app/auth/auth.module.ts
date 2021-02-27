import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EditprofileComponent } from './editprofile/editprofile.component';



@NgModule({
  declarations: [LoginComponent, SignupComponent, EditprofileComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
