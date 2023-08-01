import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { LazyLoadEvent } from 'primeng/api';

import { ManagePermissionsService } from "@app/services/managment/manage-permissions/manage-permissions.service";
import { Permission } from "@app/interfaces/permissions";
import { Table } from 'primeng/table';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.scss']
})
export class ManagePermissionsComponent implements OnInit {
  permissions: Permission[] = [];
  loadingTable = true;
  cargando = false;
  first = 0;
  rows = 10;
  totalRecords: number = 0;

  constructor(private api: ManagePermissionsService, public router: Router) { }

  ngOnInit(): void {

    this.cargar();
    this.loadPermissions({ first: 0, rows: 10 });
  }

  cargar() {
    this.cargando = true;

  }

  deletePermission(permission: Permission) {
    Swal.fire({
      title: `¿Está seguro que desea borrar el permiso ${permission.permission}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deletePermission(permission.id).subscribe();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Permiso eliminado",
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1300);
      }
    });
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
    return this.permissions ? this.first === (this.permissions.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.permissions ? this.first === 0 : true;
  }
  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, attribute: any, stringVal: any) {
    this.dt!.filter(($event.target as HTMLInputElement).value, attribute, stringVal);
  }
  loadPermissions(event: LazyLoadEvent) {

    if (event) {
      this.loadingTable = true;
      /*  this.api.getTotalRegisters(event.first, event.rows, event.filters!["permission"]?.value).subscribe(res => {
         this.totalRecords = res;
       }); */
      setTimeout(() => {
        //operador de aserción no nulo !
        this.api.getAllPermissions().subscribe(res => {
          this.permissions = res;
          this.loadingTable = false;
        });
      }, 1000);
    }

  }
}
