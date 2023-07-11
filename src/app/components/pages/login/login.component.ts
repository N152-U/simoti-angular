import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
//import { far } from '@fortawesome/free-regular-svg-icons'
//import { fab } from '@fortawesome/free-brands-svg-icons'

import { environment } from "../../../../environments/environment";
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

  constructor(private router: Router, public formBuilder: FormBuilder) {
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
  }
  onSubmit() {
    if (this.contador > 3) {
    } else {
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
