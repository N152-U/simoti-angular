/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ChangeDetectorRef } from '@angular/core';
import {
  Validators,
  FormBuilder,
} from "@angular/forms";

/* SERVICE */
import { ManageRolesService } from "../../../../../services/managment/manage-roles/manage-roles.service";

declare let require: any;

@Component({
  selector: 'app-detail-role',
  templateUrl: './detail-role.component.html',
  styleUrls: ['./detail-role.component.scss']
})
export class DetailRoleComponent implements OnInit {
  formRoleDetailGroup: any;
  public roles: any = [];
  loading = false;
  id: number | any;
  permissionsId: number[] = [];
  checked: any = false;
  hash = require('object-hash');

  showLinkedRisksOnly = true;
  condition = true;


  constructor(
    private mmr: ManageRolesService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.hash = this.route.snapshot.params["hash"];

    this.formRoleDetailGroup = this._formBuilder.group({
      role: ["", [Validators.required, Validators.minLength(2)]],
      permissions: this._formBuilder.group([]),
    });

    this.mmr.GetIdRoleDetail(this.hash).subscribe(
      (res) => {
        this.roles = res
      });
  }
}
