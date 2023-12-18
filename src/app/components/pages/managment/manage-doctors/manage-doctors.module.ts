import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageDoctorsRoutingModule } from './manage-doctors-routing.module';
import { ManageDoctorsComponent } from './manage-doctors.component';


@NgModule({
  declarations: [
    ManageDoctorsComponent
  ],
  imports: [
    CommonModule,
    ManageDoctorsRoutingModule
  ]
})
export class ManageDoctorsModule { }
