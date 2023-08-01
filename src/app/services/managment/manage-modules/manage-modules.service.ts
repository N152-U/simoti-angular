import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from "@environments/environment";
import { catchError, tap, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageModulesService {

  constructor(private http: HttpClient,) { }

  CreateModule(module: any) {
    return this.http.post(`${environment.apiUrl}/modules`, module).pipe(
      map((resp: any) => {
        module.id = resp.id;
        return module;
      })
    );
  }
  getAllModules(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/modules`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }

  getAllModulesPoints(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/modules/points`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }

  getModule(id:string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/modules/${id}`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
  deleteModule(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/modules/${id}`);
  }

  getModuleById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/modules/getUpdate/${id}`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
  UpdateModule(id: string, module: any) {
    return this.http.put(`${environment.apiUrl}/modules/${id}`, module).pipe(
      map((resp: any) => {
        module.id = resp.id;
        return module;
      })
    );
  }

  getModuleByIdDetail(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/modules/${id}`)
      .pipe(tap(data => {
        return data;
      }),
        catchError((err: HttpErrorResponse) => {

          return throwError(err);
        }))
  }
}
