import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { DetailsComponent } from './details/details.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileRoutingComponent } from './profile-routing/profile-routing.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [DetailsComponent, LayoutComponent, ProfileRoutingComponent, UpdateComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
