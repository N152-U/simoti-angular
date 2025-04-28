import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { LazyLoadEvent } from 'primeng/api';
import { Table } from "primeng/table";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  constructor(public router: Router) { }

  @ViewChild('dt') dt: Table | undefined;
}
