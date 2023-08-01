import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagmentComponent } from './managment.component';

const manageRolesModule = () => import('./manage-roles/manage-roles.module').then(x => x.ManageRolesModule);
const manageUsersModule = () => import('./manage-users/manage-users.module').then(x => x.ManageUsersModule);
const managePermissionsModule = () => import('./manage-permissions/manage-permissions.module').then(x => x.ManagePermissionsModule);
const managmentRoutes: Routes = [
  {
    path: 'managment', component: ManagmentComponent, children: [
      { path: 'manage-roles', loadChildren: manageRolesModule },
      { path: 'manage-users', loadChildren: manageUsersModule },
      { path: 'manage-permissions', loadChildren: managePermissionsModule },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(managmentRoutes)],
  exports: [RouterModule]
})
export class ManagmentRoutingModule { }
