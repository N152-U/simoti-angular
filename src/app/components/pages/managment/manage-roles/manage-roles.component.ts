import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { LazyLoadEvent } from 'primeng/api';
import { NgxPermissionsService } from "ngx-permissions";
import { Table } from "primeng/table";

import { ManageRolesService } from "../../../../services/managment/manage-roles/manage-roles.service";
import { roleModel } from "../../../../models/role/roleModel.module";

declare let require: any;
@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export class ManageRolesComponent implements OnInit {
  roles: roleModel[] = [];
  loadingTable = true;
  cargando = false;
  first = 0;
  rows = 10;
  totalRecords: number = 0;
  hash = require('object-hash');

  constructor(private api: ManageRolesService, public router: Router, private ps: NgxPermissionsService,) { }

  ngOnInit(): void {

    this.cargar();
    this.loadRoles({ first: 0, rows: 10 });
  }
  cargar() {
    this.cargando = true;

  }


  deleteRole(role: roleModel, i: number) {
    Swal.fire({
      title: `¿Está seguro que desea borrar el rol ${role.role}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.roles.splice(i, 1);
        this.api.DeleteRole(role.id!).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Rol eliminado",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        });
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
    return this.roles ? this.first === (this.roles.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.roles ? this.first === 0 : true;
  }

  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, attribute: any, stringVal: any) {
    this.dt!.filter(($event.target as HTMLInputElement).value, attribute, stringVal);
  }

  loadRoles(event: LazyLoadEvent) {

    if (event) {
      this.loadingTable = true;
      /*     this.api.getTotalRegisters(event.first, event.rows, event.filters!["role"]?.value).subscribe(res => {
            this.totalRecords = res.payload;
          }); */
      setTimeout(() => {
        //operador de aserción no nulo !
        this.api.GetAllRolesTable().subscribe(res => {
          this.roles = res;
          this.loadingTable = false;
        });
      }, 1000);
    }

  }
}
