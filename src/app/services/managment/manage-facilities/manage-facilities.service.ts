import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, tap, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageFacilitiesService {

  constructor(private http: HttpClient,) { }

  getAllFacilities(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/facilities`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }

  getAllFacilitiesPoints(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/facilities/points`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }

  getFacilityById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/facilities/getUpdate/${id}`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
  getFacilityByIdDetail(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/facilities/${id}`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
  deleteFacilities(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/facilities/${id}`);
  }

  CreateFacility(facility: any) {
    return this.http.post(`${environment.apiUrl}/facilities`, facility).pipe(
      map((resp: any) => {
        facility.id = resp.id;
        return facility;
      })
    );
  }
  UpdateFacility(id: string, facility: any) {
    return this.http.put(`${environment.apiUrl}/facilities/${id}`, facility).pipe(
      map((resp: any) => {
        facility.id = resp.id;
        return facility;
      })
    );
  }
}
