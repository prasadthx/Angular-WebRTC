import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component'
import { SignupComponent} from './signup/signup.component'

const routes:Routes = [
    { path:'login', component:LoginComponent},
    { path:'Signup', component:SignupComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
