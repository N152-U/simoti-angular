import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth.guard';

import { PatientComponent } from './patient.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { DetailPatientComponent } from './detail-patient/detail-patient.component';

const routes: Routes = [
  { 
    path: '', component: PatientComponent,canActivate: [AuthGuard],
    children: [
      { path: 'new-patient', component: NewPatientComponent, canActivate: [AuthGuard] },
      { path: "edit-patient/:hash", component: EditPatientComponent, canActivate: [AuthGuard] },
      { path: "detail-patient/:hash", component: DetailPatientComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
