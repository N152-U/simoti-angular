import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '@app/services/auth/auth.service';
import Swal from "sweetalert2";
import {
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";

import { ManageUsersService } from "@app/services/managment/manage-users/manage-users.service";
import { ConfirmedValidator } from "@app/services/managment/manage-users/confirmed.validator";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: any = {};
  newDetailGroup: FormGroup | any;
  userDetail: FormGroup | any;
  fieldTextType: boolean = false;
  fieldTextTypeConfirmation: boolean = false;
  dataUser: any;
  estado:boolean=false;

  constructor(
    private auth: AuthService,
    private mus: ManageUsersService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {

  }

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
    this.dataUser = this.auth.getTokenData();
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

        this.mus.UpdatePassword(this.user.hash, formData).subscribe((resp) => {
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

  swapper(cambio:boolean):void{

    let tab1 = document.getElementById("home-tab");
    let tab2 = document.getElementById("profile-tab");
    this.estado=cambio;

    if (cambio) {
      tab1?.classList.remove('active');
      tab2?.classList.add('active');
    } else {
      tab1?.classList.add('active');
      tab2?.classList.remove('active');
    }
  }

}
