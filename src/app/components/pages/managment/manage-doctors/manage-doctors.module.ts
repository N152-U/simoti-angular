import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageDoctorsRoutingModule } from './manage-doctors-routing.module';
import { ManageDoctorsComponent } from './manage-doctors.component';
import { NewDoctorComponent } from './new-doctor/new-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { DetailDoctorComponent } from './detail-doctor/detail-doctor.component';


@NgModule({
  declarations: [
    ManageDoctorsComponent,
    NewDoctorComponent,
    EditDoctorComponent,
    DetailDoctorComponent
  ],
  imports: [
    CommonModule,
    ManageDoctorsRoutingModule
  ]
})
export class ManageDoctorsModule { }
