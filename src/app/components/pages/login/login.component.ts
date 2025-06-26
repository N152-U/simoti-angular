import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
//import { far } from '@fortawesome/free-regular-svg-icons'
//import { fab } from '@fortawesome/free-brands-svg-icons'
import { AuthService } from '@app/services/auth/auth.service';
import { environment } from '@environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  siteKey: string;
  appVersion: string;
  appAlias: string;
  aFormGroup: any;
  contador = 1;
  fieldTextType: boolean = false;

  constructor(private router: Router, public formBuilder: FormBuilder, public auth: AuthService,) {
    this.appVersion = environment.version;
    this.appAlias = environment.alias;
    this.siteKey = "6LehS1QbAAAAAOVXYZn6AnHb3YDpc64FlYMF6CL2";
  }

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", Validators.required],
      recaptcha: ["", this.contador > 3 ? Validators.required : Validators.nullValidator]
    });

    if (this.auth.isAuth()) {
      this.router.navigateByUrl("/home");
    }
  }
  onSubmit() {
    if (this.contador > 3) {
      if (this.aFormGroup.value.recaptcha != "") {

        this.aFormGroup.value.recaptcha = "";
        this.aFormGroup.value = {
          username: this.aFormGroup.value.username,
          password: this.aFormGroup.value.password,
        };
        this.auth.logIn(this.aFormGroup.value).subscribe(
          (data) => {
            this.router.navigateByUrl("/patient");
          },
          (err) => {
            Swal.fire({
              icon: "error",
              title: "Error al autenticar",
              text: err.error.message,
            });
            this.contador++;
          }
        );
      }
    } else {
      this.aFormGroup.value = {
        username: this.aFormGroup.value.username,
        password: this.aFormGroup.value.password,
      };
      this.auth.logIn(this.aFormGroup.value).subscribe(
        (data) => {
          this.router.navigateByUrl("/home");
        },
        (err) => {
          Swal.fire({
            icon: "error",
            title: "Error al autenticar",
            text: err.error.message,
          });
          this.contador++;
        }
      );
    }
  }
  get username() {
    return this.aFormGroup.get('username');
  }
  get password() {
    return this.aFormGroup.get('password');
  }
  get recaptcha() {
    return this.aFormGroup.get('recaptcha');
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
