import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, tap, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HypochloriteEgressService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/hypochlorite-egress`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }

  getMostRecent(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/hypochlorite-egress/mostRecent`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }

  getByRange(initialDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/hypochlorite-egress/getSuppliesByRange/${initialDate}/${endDate}`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }));
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/hypochlorite-egress/getUpdate/${id}`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }

  getlastSupplyByFacilityId(id: string): Observable<any> {
    console.log("Entro al servicio");
    const res = this.http.get<any>(`${environment.apiUrl}/hypochlorite-egress/lastSupplyByfacilityId/${id}`)
    console.log(res);
    return res
  }

  getHypochloriteEgressReportPDFRangeOfDates(initialDate: string, endDate: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/hypochlorite-egress/pdf/${initialDate}/${endDate}`, {location: "report.pdf"}, { responseType: 'blob' })
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }

  getByIdDetail(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/hypochlorite-egress/${id}`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/hypochlorite-egress/${id}`);
  }

  Create(hypochloriteEgress: any) {
    return this.http.post(`${environment.apiUrl}/hypochlorite-egress`, hypochloriteEgress).pipe(
      map((resp: any) => {
        hypochloriteEgress.id = resp.id;
        return hypochloriteEgress;
      })
    );
  }
  Update(id: string, hypochloriteEgress: any) {
    return this.http.put(`${environment.apiUrl}/hypochlorite-egress/${id}`, hypochloriteEgress).pipe(
      map((resp: any) => {
        hypochloriteEgress.id = resp.id;
        return hypochloriteEgress;
      })
    );
  }
}
