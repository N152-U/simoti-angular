import { Component } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-manage-doctors',
  templateUrl: './manage-doctors.component.html',
  styleUrls: ['./manage-doctors.component.scss']
})
export class ManageDoctorsComponent {
  constructor(public router: Router) { }
}
