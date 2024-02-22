import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LazyLoadEvent } from 'primeng/api';
import { NgxPermissionsService } from 'ngx-permissions';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.scss'],
})
export class ManagePatientsComponent implements OnInit {
  constructor(public router: Router, private ps: NgxPermissionsService) {}

  ngOnInit(): void {}
}
