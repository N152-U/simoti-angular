import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth.guard';

import { ManagePatientsComponent } from './manage-patients.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { DetailPatientComponent } from './detail-patient/detail-patient.component';

const routes: Routes = [
  {
    path: '', component: ManagePatientsComponent, canActivate: [AuthGuard],
    children: [
      { path: 'new-patient', component: NewPatientComponent, canActivate: [AuthGuard] },
      { path: 'edit-patient/:id', component: EditPatientComponent, canActivate: [AuthGuard] },
      { path: 'detail-patient/:id', component: DetailPatientComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePatientsRoutingModule { }
