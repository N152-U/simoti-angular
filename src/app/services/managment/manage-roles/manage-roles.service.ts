import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Router } from "@angular/router";
import { catchError, map, tap } from "rxjs/operators";
import { NgxRolesService } from "ngx-permissions";
import { Observable, throwError } from "rxjs";

import { roleModel } from "@app/models/role/roleModel.module";



@Injectable({
  providedIn: "root",
})
export class ManageRolesService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private rs: NgxRolesService
  ) { }

  CreateRole(role: roleModel) {
    return this.http.post(`${environment.apiUrl}/roles/add`, role).pipe(
      map((resp: any) => {
        role.id = resp.id;
        return role;
      })
    );
  }

  GetAllRolesTable(): Observable<any> {
    return this.http.get<{ payload: roleModel }>(`${environment.apiUrl}/roles`)
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }

  DeleteRole(hash: string) {
    return this.http.delete(`${environment.apiUrl}/roles/delete/${hash}`);
  }

  GetIdRoleDetail(hash: string): Observable<any> {
    return this.http.get<{ payload: [] }>(`${environment.apiUrl}/roles/${hash}`)
      .pipe(map(res => {
        return res;

      }));
  }

  GetRoleUpdate(hash: string): Observable<any> {
    return this.http.get<{ payload: [] }>(`${environment.apiUrl}/roles/getUpdate/${hash}`)
      .pipe(map(res => {
        return res;

      }));
  }

  UpdateRole(hash: string, params: any) {
    return this.http.put(`${environment.apiUrl}/roles/update/${hash}`, params);
  }
}
