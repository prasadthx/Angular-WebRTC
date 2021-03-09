import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetstartedComponent } from './getstarted/getstarted.component'

const routes:Routes = [
  {path:'', component:GetstartedComponent}
];

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
