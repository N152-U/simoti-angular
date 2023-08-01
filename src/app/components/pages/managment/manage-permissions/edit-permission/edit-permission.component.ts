import { Component, OnInit, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from '@app/interfaces/permissions';
import Swal from 'sweetalert2';

import { ManagePermissionsService } from '@app/services/managment/manage-permissions/manage-permissions.service';


@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.scss']
})
export class EditPermissionComponent implements OnInit {

  EditPermission: Permission[] = [];
  editDetailGroup: FormGroup | any;
  id: string | any;

  constructor(
    private api: ManagePermissionsService,
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.editDetailGroup = this.formBuilder.group(
      {

        permission: [
          "",
          [
            Validators.required,
          ],
        ],
        description: [
          "",
          [
            Validators.required,
          ],
        ],
      },
    );

    this.api.getPermission(this.id).subscribe((data) => {
      this.editDetailGroup.patchValue(data);
      this.editDetailGroup.get("permission").setValue(data.permission);
      this.editDetailGroup.get("description").setValue(data.description);
    });
  }

  UpdatePermission() {
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.editDetailGroup.value;
        this.api.updatePermission(this.id, formData).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Permiso actualizado",
            showConfirmButton: false,
          });
          this.router.navigate(["/managment/manage-permissions"]);
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        });
      } else if (result.isDenied) {
        Swal.fire("Permiso no actualizado", "", "info");
      }
    });
  }

  get permission() {
    return this.editDetailGroup.get("permission");
  }

  get description() {
    return this.editDetailGroup.get("description");
  }

}
