import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePatientsRoutingModule } from './manage-patients-routing.module';
import { ManagePatientsComponent } from './manage-patients.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { DetailPatientComponent } from './detail-patient/detail-patient.component';


@NgModule({
  declarations: [
    ManagePatientsComponent,
    NewPatientComponent,
    EditPatientComponent,
    DetailPatientComponent
  ],
  imports: [
    CommonModule,
    ManagePatientsRoutingModule
  ]
})
export class ManagePatientsModule { }
