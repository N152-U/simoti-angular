import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { ConfirmedValidator } from '@app/services/managment/manage-users/confirmed.validator';
import { ManageUsersService } from '@app/services/managment/manage-users/manage-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-update-password',
  templateUrl: './user-update-password.component.html',
  styleUrls: ['./user-update-password.component.scss']
})
export class UserUpdatePasswordComponent implements OnInit{

  user: any = {};
  fieldTextType: boolean = false;
  fieldTextTypeConfirmation: boolean = false;
  newDetailGroup: FormGroup | any;

  constructor(
    private mus: ManageUsersService,
    private router: Router,
    public formBuilder: FormBuilder,
    private auth: AuthService,
  ){}

  ngOnInit(): void {
    this.newDetailGroup = this.formBuilder.group(
      {

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
    this.user = this.auth.getTokenData();
  }

  updatePassword() {
    Swal.fire({
      title: "¿Desea cambiar su contraseña?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = this.newDetailGroup.value;
        delete formData["confirmPassword"];

        this.mus.UpdatePassword(this.user.username, formData).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Contraseña Actualizada",
            showConfirmButton: false,
          });
          this.router.navigate(["/profile"]);

          setTimeout(() => {
            window.location.reload();
          }, 1300);
        });
      } else if (result.isDenied) {
        Swal.fire("Contraseña No actualizada", "", "info");
      }
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypeConfirmation() {
    this.fieldTextTypeConfirmation = !this.fieldTextTypeConfirmation;
  }
  get password() {
    return this.newDetailGroup.get("password");
  }

  get confirmPassword() {
    return this.newDetailGroup.get("confirmPassword");
  }

}
