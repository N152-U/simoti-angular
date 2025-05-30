import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Router } from "@angular/router";
import { patientModel } from "../../../models/patient/patientModel.module";
import { catchError, map, tap } from "rxjs/operators";
import { NgxRolesService } from "ngx-permissions";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private http: HttpClient
  ) { }

  CreatePatient(patient:any){
    return this.http.post(`${environment.apiUrl}/patients/add`, patient).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  GetAllPatient(): Observable<any> {
    return this.http
      .get<{ payload: patientModel }>(`${environment.apiUrl}/patients`)
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }
}
