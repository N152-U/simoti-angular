import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from '@app/interfaces/roles';
import { TypesOfUsers } from '@app/interfaces/types';
import { ManageRolesService } from '@app/services/managment/manage-roles/manage-roles.service';
import { CatalogsService } from '@app/services/managment/catalogs/catalogs.service';
import { ConfirmedValidator } from '@app/services/managment/manage-users/confirmed.validator';
import { ManageUsersService } from '@app/services/managment/manage-users/manage-users.service';
import { Select2Data } from 'ng-select2-component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  newUserGroup: FormGroup | any;
  fieldTextType: boolean = false;
  step1: boolean = true;
  stepDoctor: boolean = false;
  fieldTextTypeConfirmation: boolean = false;
  pattern = "^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*[\-\._]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$";
  roles: Roles[] = [];
  types: TypesOfUsers[] = [];

  data: Select2Data = [];
  dataTypeUser: Select2Data = [];

  constructor(
    private router: Router,
    private mrs: ManageRolesService,
    private cs: CatalogsService,
    public formBuilder: FormBuilder,
    private userService: ManageUsersService
  ) { }

  ngOnInit(): void {

    this.newUserGroup = this.formBuilder.group(
      {
        role_id: ["", Validators.required],
        type_user_id: ["", Validators.required],
        username: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50),
            Validators.pattern(this.pattern)
          ],
        ],
        first_name: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(40),
            Validators.pattern(this.pattern),
          ],
        ],
        middle_name: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(40),
            Validators.pattern(this.pattern),
          ],
        ],
        last_name: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(40),
            Validators.pattern(this.pattern),
          ],
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
        confirmPassword: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
      },
      {
        validator: ConfirmedValidator("password", "confirmPassword"),
      }
    );

    this.mrs.GetAllRolesTable().subscribe((res: any) => {
      this.roles = res;
      this.roles.forEach((value) => {
        this.data.push({
          value: value.id,
          label: value.role,
          data: {
            id: value.id,
            name: value.role
          }
        });
      });
    });

    this.cs.GetAllTypesUsers().subscribe((res: any) => {
      this.types = res;
      this.types.forEach((value) => {
        this.dataTypeUser.push({
          value: value.id,
          label: value.name,
          data: {
            id: value.id,
            name: value.name
          }
        });
      });
    });
  }

  CreateUser() {
    Swal.fire({
      title: "¿Desea guardar el nuevo usuario?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.newUserGroup.value;
        delete formData["confirmPassword"];
        console.log(formData);

        this.userService.CreateUser(formData).subscribe((res: any) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario guardado",
            showConfirmButton: false,
          });
          /*   this.router.navigate(["/managment/manage-users"]);
            setTimeout(() => {
              window.location.reload();
            }, 1300); */
        });
      } else if (result.isDenied) {
        Swal.fire("Usuario no guardado", "", "info");
      }
    });
  }

  nextStep() {
    let typeUser: any = document.getElementById("type_user_id") as HTMLInputElement | null;
    if (this.type_user_id.value == 1) {
      this.step1 = false;
      this.stepDoctor = true;
    }

  }

  get role_id() {
    return this.newUserGroup.get("role_id");
  }
  get type_user_id() {
    return this.newUserGroup.get("type_user_id");
  }
  get username() {
    return this.newUserGroup.get("username");
  }
  get first_name() {
    return this.newUserGroup.get("first_name");
  }
  get middle_name() {
    return this.newUserGroup.get("middle_name");
  }
  get last_name() {
    return this.newUserGroup.get("last_name");
  }
  get password() {
    return this.newUserGroup.get("password");
  }
  get confirmPassword() {
    return this.newUserGroup.get("confirmPassword");
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextTypeConfirmation() {
    this.fieldTextTypeConfirmation = !this.fieldTextTypeConfirmation;
  }

}
