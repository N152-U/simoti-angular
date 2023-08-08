import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { roleModel } from "../../../../../models/role/roleModel.module";
import { PermissionModel } from "../../../../../models/role/permissionModel.module";
import { CatalogsService } from '@app/services/managment/catalogs/catalogs.service';
import { ManageRolesService } from '@app/services/managment/manage-roles/manage-roles.service';


@Component({
  selector: "app-new-role",
  templateUrl: "./new-role.component.html",
  styleUrls: ["./new-role.component.scss"],
})
export class NewRoleComponent implements OnInit {
  newRole: roleModel = new roleModel();
  aFormGroup: any;
  permissionsData: PermissionModel[] = [];
  patternText = "^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*[\-\._]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$";

  constructor(
    private mmc: CatalogsService,
    private router: Router,
    public formBuilder: FormBuilder,
    private mmr: ManageRolesService
  ) { }

  ngOnInit(): void {
    this.mmc.GetAllPermissions().subscribe((res) => {
      this.permissionsData = res;
    }
    );

    this.aFormGroup = this.formBuilder.group({
      role: ["", [Validators.required, Validators.minLength(2), Validators.pattern(this.patternText)]],
      permissions: this.formBuilder.array([], [Validators.required, Validators.minLength(1)])
    });
  }

  roleChanged() { }

  CheckboxArray(id: any, isChecked: any, key: any) {
    const permissions = <FormArray>this.aFormGroup.get(key);
    if (isChecked) {
      permissions.push(new FormControl(id));
    } else {
      const idx = permissions.controls.findIndex(x => x.value == id);
      permissions.removeAt(idx);
    }
  }

  save() {
    Swal.fire({
      title: "¿Desea guardar el nuevo rol?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,

    }).then((result) => {
      if (result.isConfirmed) {
        this.mmr.CreateRole(this.aFormGroup.value).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Rol guardado",
            showConfirmButton: false,
          });
          this.router.navigate(["/managment/manage-roles"]);
          setTimeout(() => {
            window.location.reload();
          }, 1100);
        });
      } else if (result.isDenied) {
        Swal.fire("Rol no guardado", "", "info");
      }
    });
  }
  get role() {
    return this.aFormGroup.get("role");
  }

  get permissions() {
    return this.aFormGroup.get("permissions");
  }

}
