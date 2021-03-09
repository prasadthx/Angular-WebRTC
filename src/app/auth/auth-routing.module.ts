import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent} from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './helpers/auth.guard';
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);


const routes: Routes = [
  { path: 'auth', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'auth/account', loadChildren: accountModule },
  { path: 'auth/profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  //otherwise redirect to home
  // { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
