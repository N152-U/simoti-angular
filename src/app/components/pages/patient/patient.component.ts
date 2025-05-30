import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { LazyLoadEvent } from 'primeng/api';

import { Table } from "primeng/table";
import { PatientsService } from "../../../services/managment/patients/patients.service";
import { patientModel } from "@app/models/patient/patientModel.module";
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {

  patients: patientModel[] = [];
  loadingTable = true;
  cargando = false;
  first = 0;
  rows = 10;
  totalRecords: number = 0;

  constructor(private ps: PatientsService, public router: Router) { }

  ngOnInit(): void {
    this.cargar();
    this.loadPatients({ first: 0, rows: 10 });
  }

  cargar() {
    this.cargando = true;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.patients ? this.first === (this.patients.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.patients ? this.first === 0 : true;
  }

  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, attribute: any, stringVal: any) {
    this.dt!.filter(($event.target as HTMLInputElement).value, attribute, stringVal);
  }

  loadPatients(event: LazyLoadEvent) {
    if (event) {
      this.loadingTable = true;

      setTimeout(() => {
        this.ps.GetAllPatient().subscribe(res => {
          this.patients = res;
          this.loadingTable = false;
        });
      }, 1000);
    }

  }
}
