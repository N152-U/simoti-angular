import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ManagePermissionsService } from '@app/services/managment/manage-permissions/manage-permissions.service';

@Component({
  selector: 'app-detail-permission',
  templateUrl: './detail-permission.component.html',
  styleUrls: ['./detail-permission.component.scss']
})
export class DetailPermissionComponent implements OnInit {
  public permission: any = {};

  id: string | any;

  constructor(
    private mps: ManagePermissionsService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];

    this.mps.getPermission(this.id).subscribe((res) => {
      this.permission = res;
    });
  }

}
