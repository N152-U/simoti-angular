import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { LazyLoadEvent } from 'primeng/api';



import { ManageUsersService } from "../../../../services/managment/manage-users/manage-users.service";

import { UserModel } from "@app/models/user/userModel.module";
import { Table } from "primeng/table";

@Component({
  selector: "app-manage-users",
  templateUrl: "./manage-users.component.html",
  styleUrls: ["./manage-users.component.scss"],
})
export class ManageUsersComponent implements OnInit {
  users: UserModel[] = [];
  loadingTable = true;
  cargando = false;
  first = 0;
  rows = 10;
  totalRecords: number = 0;
  tokenDialog: boolean = false;
  tokenValue: string = '';
  selectedUserId: string | null = null;

  constructor(private mmu: ManageUsersService, public router: Router) { }

  ngOnInit(): void {
    this.cargar();
    this.loadUsers({ first: 0, rows: 10 });
  }
  cargar() {
    this.cargando = true;
  }

  DeleteUser(user: any, i: number) {
    Swal.fire({
      title: `¿Está seguro que desea borrar a ${user.username}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.users.splice(i, 1);
          this.mmu.DeleteUser(user.id).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario eliminado",
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
    return this.users ? this.first === (this.users.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }

  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, attribute: any, stringVal: any) {
    this.dt!.filter(($event.target as HTMLInputElement).value, attribute, stringVal);
  }

  loadUsers(event: LazyLoadEvent) {
    if (event) {
      this.loadingTable = true;
      setTimeout(() => {
        this.mmu.GetAllUsers().subscribe(res => {
          this.users = res;
          this.loadingTable = false;
        });
      }, 1000);
    }

  }

  openTokenModal(user: any) {
    this.selectedUserId = user.id;
    this.tokenValue = user.tokenFcw ?? '';
    this.tokenDialog = true;
  }

  saveToken() {
    if (this.selectedUserId && this.tokenValue) {
      const payload = {
        userId: this.selectedUserId,
        token: this.tokenValue
      };
  
      this.mmu.sendToken(payload.userId,payload.token).subscribe({
        next: () => {
          this.tokenDialog = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Token guardado',
            showConfirmButton: false,
          });
          this.router.navigate(["/managment/manage-users"]);
          setTimeout(() => {
            window.location.reload();
          }, 1300);
        },
        error: (error) => {
        }
      });
    }
  }

}
