import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

import { Municipality } from '@app/interfaces/municipalities';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {

  constructor(private http: HttpClient,) { }

  GetAllMunicipalities(): Observable<any> {
    return this.http.get<{ payload: Municipality }>(`${environment.apiUrl}/municipalities`)
      .pipe(tap(data => {

        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }

  GetAllMunicipalitiesShapes(): Observable<any> {
    return this.http.get<{ payload: Municipality }>(`${environment.apiUrl}/municipalities/shapes`)
      .pipe(tap(data => {

        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }

  GetAllStatuses(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/statuses`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
  GetAllModules(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/modules`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
  GetAllFacilities(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/facilities`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
  GetAllFacilitiesByModuleAndFacilityType(module_id: number, facility_type_id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/facilities/byModuleAndFacilityType/${module_id}/${facility_type_id}`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
  GetSettlementsByMunicipality(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/settlements/municipality/${id}`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
  GetSettlements(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/settlements`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
  GetAllPermissions(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/permissions`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }

  GetAllFacilityTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/facility-type`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }

  GetAllCapacities(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/tanks-capacities`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
}