import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '@app/interfaces/roles';
import { ManageRolesService } from '@app/services/managment/manage-roles/manage-roles.service';
import { ConfirmedValidator } from '@app/services/managment/manage-users/confirmed.validator';
import { ManageUsersService } from '@app/services/managment/manage-users/manage-users.service';
import { Select2Data } from 'ng-select2-component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit{

  editUserGroup: FormGroup | any;
  fieldTextType: boolean = false;
  fieldTextTypeConfirmation: boolean = false;
  pattern = "^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*[\-\._]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$";
  hash: string = '';
  roles: Roles[] = [];

  data: Select2Data = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mrs: ManageRolesService,
    public formBuilder: FormBuilder,
    private userService: ManageUsersService
  ) { }

  ngOnInit(): void {
    this.hash = this.route.snapshot.params["hash"];

    this.editUserGroup = this.formBuilder.group(
      {
        role_id: ["", Validators.required],
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

    setTimeout(()=>{
      this.userService.GetUpdateByHash(this.hash).subscribe((res) => {
        this.editUserGroup.patchValue(res);
      });
    }, 500);
  }

  EditUser() {
    Swal.fire({
      title: "¿Desea actualizar al usuario?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.editUserGroup.value;
        this.userService.UpdateUser(this.hash, formData).subscribe((res: any) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario actualizado",
            showConfirmButton: false,
          });
          this.router.navigate(["/managment/manage-users"]);
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        });
      } else if (result.isDenied) {
        Swal.fire("Usuario no actualizado", "", "info");
      }
    });
  }

  get role_id() {
    return this.editUserGroup.get("role_id");
  }
  get username() {
    return this.editUserGroup.get("username");
  }
  get first_name() {
    return this.editUserGroup.get("first_name");
  }
  get middle_name() {
    return this.editUserGroup.get("middle_name");
  }
  get last_name() {
    return this.editUserGroup.get("last_name");
  }
  get password() {
    return this.editUserGroup.get("password");
  }
  get confirmPassword() {
    return this.editUserGroup.get("confirmPassword");
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextTypeConfirmation() {
    this.fieldTextTypeConfirmation = !this.fieldTextTypeConfirmation;
  }
}
