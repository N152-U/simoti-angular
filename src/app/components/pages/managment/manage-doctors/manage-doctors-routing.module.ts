import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth.guard';

import { ManageDoctorsComponent } from './manage-doctors.component';
import { NewDoctorComponent } from './new-doctor/new-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { DetailDoctorComponent } from './detail-doctor/detail-doctor.component';

const routes: Routes = [
  {
    path: '', component: ManageDoctorsComponent, canActivate: [AuthGuard],
    children: [
      { path: 'new-patient', component: NewDoctorComponent, canActivate: [AuthGuard] },
      { path: 'edit-patient/:id', component: EditDoctorComponent, canActivate: [AuthGuard] },
      { path: 'detail-patient/:id', component: DetailDoctorComponent, canActivate: [AuthGuard] },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageDoctorsRoutingModule { }
