import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { GetstartedComponent } from './getstarted/getstarted.component'

const routes:Routes = [
  // {path:'', component:GetstartedComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
