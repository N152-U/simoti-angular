import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagePatientsComponent } from "./manage-patients.component";
/* import { NewUserComponent } from "./new-user/new-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { DetailUserComponent } from "./detail-user/detail-user.component"; */
import { AuthGuard } from '@app/guards/auth.guard';

const routes: Routes = [

  {
    path: '', component: ManagePatientsComponent, canActivate: [AuthGuard],
   /*  children: [
      { path: 'new-patient', component: NewUserComponent, canActivate: [AuthGuard] },
      { path: "edit-patient/:hash", component: EditUserComponent, canActivate: [AuthGuard] },
      { path: "detail-patient/:hash", component: DetailUserComponent, canActivate: [AuthGuard] }
    ] */
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePatientsRoutingModule { }
