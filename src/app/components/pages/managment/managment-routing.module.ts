import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagmentComponent } from './managment.component';

const manageRolesModule = () => import('./manage-roles/manage-roles.module').then(x => x.ManageRolesModule);
const manageUsersModule = () => import('./manage-users/manage-users.module').then(x => x.ManageUsersModule);
const managePermissionsModule = () => import('./manage-permissions/manage-permissions.module').then(x => x.ManagePermissionsModule);

const managePatientsModule = () => import('./manage-patients/manage-patients.module').then(x => x.ManagePatientsModule);
const manageDoctorsModule = () => import('./manage-doctors/manage-doctors.module').then(x => x.ManageDoctorsModule);
const managmentRoutes: Routes = [
  {
    path: 'managment', component: ManagmentComponent, children: [
      { path: 'manage-roles', loadChildren: manageRolesModule },
      { path: 'manage-users', loadChildren: manageUsersModule },
      { path: 'manage-permissions', loadChildren: managePermissionsModule },
      { path: 'manage-patients', loadChildren: managePatientsModule },
      { path: 'manage-doctors', loadChildren: manageDoctorsModule },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(managmentRoutes)],
  exports: [RouterModule]
})
export class ManagmentRoutingModule { }
