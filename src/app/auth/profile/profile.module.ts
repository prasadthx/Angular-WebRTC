import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { DetailsComponent } from './details/details.component';
import { LayoutComponent } from './layout/layout.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [DetailsComponent, LayoutComponent, UpdateComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
