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

  UpdatePatient(patient:any,id:string){
    return this.http.post(`${environment.apiUrl}/patients/update/${id}`, patient).pipe(
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

  DeletePatient(hasPatient: string) {
    return this.http.delete(`${environment.apiUrl}/patients/delete/${hasPatient}`);
  }

  GetPatientByHash(hash: string) {
    return this.http
      .get<{ payload: any }>(`${environment.apiUrl}/patients/${hash}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  GetPatientDetailByHash(hash: string) {
    return this.http
      .get<{ payload: any }>(`${environment.apiUrl}/patients/detail/${hash}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  GetPatientEditByHash(hash: string) {
    return this.http
      .get<{ payload: any }>(`${environment.apiUrl}/patients/edit/${hash}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  GetPatientTemperatureByHash(hash: string,startDate:string,endDate:string) {
    return this.http
      .get<{ payload: any }>(`${environment.apiUrl}/measurements/temperature/patient/${hash}/${startDate}/${endDate}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
