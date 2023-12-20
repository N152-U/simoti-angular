import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.scss']
})
export class ManagePatientsComponent {

  constructor(public router: Router) { }
}
