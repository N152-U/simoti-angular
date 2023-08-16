import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagePermissionsComponent } from './manage-permissions.component';
import { NewPermissionComponent } from './new-permission/new-permission.component';
import { EditPermissionComponent } from './edit-permission/edit-permission.component';
import { DetailPermissionComponent } from './detail-permission/detail-permission.component';
import { AuthGuard } from '@app/guards/auth.guard';
const routes: Routes = [
  {
    path: '', component: ManagePermissionsComponent, /* canActivate: [AuthGuard], */
    children: [
      { path: 'new-permission', component: NewPermissionComponent, canActivate: [AuthGuard] },
      { path: 'edit-permission/:id', component: EditPermissionComponent, canActivate: [AuthGuard] },
      { path: 'detail-permission/:id', component: DetailPermissionComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePermissionsRoutingModule { }
