import { Component, OnInit, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Permission } from '@app/interfaces/permissions';
import { ManagePermissionsService } from '@app/services/managment/manage-permissions/manage-permissions.service';

@Component({
  selector: 'app-new-permission',
  templateUrl: './new-permission.component.html',
  styleUrls: ['./new-permission.component.scss']
})
export class NewPermissionComponent implements OnInit {

  public permissions: Permission[] = [];

  newDetailGroup: FormGroup | any;
  fieldTextType: boolean = false;
  fieldTextTypeConfirmation: boolean = false;
  patternText = "^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*[\-\._]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$";

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private permissionsService: ManagePermissionsService,
  ) { }

  ngOnInit(): void {

    this.newDetailGroup = this.formBuilder.group(
      {
        permission: ["", [Validators.required, Validators.minLength(4), Validators.pattern(this.patternText)],],
        description: ["", [Validators.required, Validators.minLength(4), Validators.pattern(this.patternText)],],
      },
    );
  }

  CreatePermission() {
    Swal.fire({
      title: "¿Desea guardar el nuevo permiso?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.newDetailGroup.value;
        this.permissionsService.createPermission(formData).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Permiso guardado",
            showConfirmButton: false,
          });
          this.router.navigate(["/managment/manage-permissions"]);
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        });
      } else if (result.isDenied) {
        Swal.fire("Permiso no guardado", "", "info");
      }
    });
  }

  roleChanged() { null }

  get permission() {
    return this.newDetailGroup.get("permission");
  }
  get description() {
    return this.newDetailGroup.get("description");
  }

}
