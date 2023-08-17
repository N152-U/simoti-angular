import { Component, isDevMode, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { ChangeDetectorRef } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { first } from "rxjs/operators";

import { PermissionModel } from "@app/models/role/permissionModel.module";
import { ManageRolesService } from "@app/services/managment/manage-roles/manage-roles.service";
import { CatalogsService } from "@app/services/managment/catalogs/catalogs.service";

declare let require: any

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  formRoleUpdateGroup: any;
  permissionsData: PermissionModel[] = [];
  loading = false;
  id: number = 0;
  permissionsId: number[] = [];
  checked: any = false;
  hash = require('object-hash');
  patternText = "^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*[\-\._]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$";

  showLinkedRisksOnly = true;
  condition = true;

  constructor(
    private mmr: ManageRolesService,
    private mmc: CatalogsService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.hash = this.route.snapshot.params["hash"];

    this.formRoleUpdateGroup = this._formBuilder.group({
      role: ["", [Validators.required, Validators.minLength(2), Validators.pattern(this.patternText)]],
      permissions: this._formBuilder.group([]),
    });


    this.mmr.GetRoleUpdate(this.hash).subscribe(
      (res) => {

        this.formRoleUpdateGroup.patchValue(res);
        this.permissionsId = res.permissions;

        this.mmc.GetAllPermissions().subscribe((res) => {
          this.permissionsData = res;
          const newPermissions: number[] = this.permissionsData.map<any>((value) => { return value.id });
          const checkboxes = <FormGroup>this.formRoleUpdateGroup.get('permissions');

          this.permissionsData.forEach((option: PermissionModel, index: number) => {

            //if (isDevMode()) console.log("permissions_role", this.permissionsId, "id_foreach", newPermissions[index], "permissions_includes", this.permissionsId.indexOf(newPermissions[index]) >= 0, "nara", String(option.id))

            checkboxes.addControl(String(option.id), new FormControl(this.permissionsId.indexOf(newPermissions[index]) >= 0));
          });
        });
      });

    this.formRoleUpdateGroup.valueChanges.subscribe((data: any) =>
      this.onFormformRoleDetailGroupChange(data)
    );
  }


  onCheckboxChange(event: Event): void {
    //if (isDevMode()) console.log(this.formRoleUpdateGroup.get("permissions"))
  }


  onFormformRoleDetailGroupChange(data: any) {
    //if (isDevMode()) console.log("Data", data);
  }

  UpdateRole() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.formRoleUpdateGroup.value;

        let permissionsId: string[] = [];
        let index = 0;
        Object.entries(formData.permissions).forEach(([key, value]) => {

          if (value == true) {
            permissionsId[index] = key;
            index++;
          }
        });

        delete formData["permissions"];
        formData.permissions = permissionsId;

        this.mmr
          .UpdateRole(this.hash, this.formRoleUpdateGroup.value)
          .pipe(first())
          .subscribe(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Rol actualizado",
              showConfirmButton: false,
            });
            this.router.navigate(["/managment/manage-roles"]);
            setTimeout(() => {
              window.location.reload();
            }, 1300);
          });
      } else if (result.isDenied) {
        Swal.fire("Rol no actualizado", "", "info");
      }
    });
  }

  get role() {
    return this.formRoleUpdateGroup.get("role");
  }
  get permissions() {
    return this.formRoleUpdateGroup.get("permissions");
  }
}
