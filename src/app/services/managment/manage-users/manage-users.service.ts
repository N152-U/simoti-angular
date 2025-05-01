import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Router } from "@angular/router";
/*---- MODELS---- */
import { UserModel } from "../../../models/user/userModel.module";
import { userTypeModel } from "../../../models/user/userTypeModel.module";
import { catchError, map, tap } from "rxjs/operators";
import { NgxRolesService } from "ngx-permissions";
import { Observable, throwError } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ManageUsersService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private rs: NgxRolesService
  ) { }


  GetAllUsers(): Observable<any> {
    return this.http
      .get<{ payload: UserModel }>(`${environment.apiUrl}/users`)
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }

  GetByUsersType(type: any): Observable<any> {
    return this.http
      .get<{ payload: userTypeModel }>(`${environment.apiUrl}/users/type/${type}`)
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }


  /*  FUNCION POST CreateUser */
  CreateUser(user: any) {
    return this.http.post(`${environment.apiUrl}/users/add`, user).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
  getTotalRegisters(offset: any, limit: any, username = null, firstName = null, middleName = null, lastName = null, roleName = null) {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('offset', offset);
    params = params.append('limit', limit);
    if (username)
      params = params.append('username', username);
    if (firstName)
      params = params.append('firstName', firstName);
    if (middleName)
      params = params.append('middleName', middleName);
    if (lastName)
      params = params.append('lastName', lastName);
    if (roleName)
      params = params.append('roleName', roleName);
    return this.http.get<{ payload: number }>(`${environment.apiUrl}user/getTotalCount`, { params })
      .pipe(tap(data => {
        return data.payload;
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        }))
  }
  /*FUNCION PUT UpdateUser */
  UpdateUser(hashUser: string, user: any) {
    return this.http.put(`${environment.apiUrl}/users/update/${hashUser}`, user);
  }
  /*FUNCION PUT UpdatePassword */
  UpdatePassword(username: string, password: any) {
    return this.http.put(`${environment.apiUrl}/users/updatePassword/${username}`, password);
  }
  /*  FUNCION DELETE DeleteUser */
  DeleteUser(hashUser: string) {
    return this.http.delete(`${environment.apiUrl}/users/delete/${hashUser}`);
  }
  /* FUNCION GetIdUser */
  GetUserByHash(hash: string) {
    return this.http
      .get<{ payload: any }>(`${environment.apiUrl}/users/${hash}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  /* FUNCION Get user details to update by hash */
  GetUpdateByHash(hash: string) {
    return this.http
      .get<{ payload: any }>(`${environment.apiUrl}/users/getUpdate/${hash}`);
  }

  GetDetailUser() {
    return this.http
      .get<{ payload: UserModel }>(`${environment.apiUrl}user/getDetail`)
      .pipe(
        map((res) => {
          return res.payload;
        })
      );
  }
  GetByIdUserDetail(hash: string) {
    return this.http
      .get<{ payload: UserModel }>(`${environment.apiUrl}user/getById/${hash}/detail`)
      .pipe(
        map((res) => {
          return res.payload;
        })
      );
  }
}
