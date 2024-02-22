import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePatientsRoutingModule } from './manage-patients-routing.module';
import { ManagePatientsComponent } from './manage-patients.component';


@NgModule({
  declarations: [
    ManagePatientsComponent
  ],
  imports: [
    CommonModule,
    ManagePatientsRoutingModule
  ]
})
export class ManagePatientsModule { }
