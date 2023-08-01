import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission } from '@app/interfaces/permissions';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagePermissionsService {
  constructor(private http: HttpClient) { }

  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.apiUrl}/permissions`);
  }

  getTotalRegisters(offset: any, limit: any, permission = null) {
    return this.http.get<number>(`${environment.apiUrl}/permissions`);
  }

  getPermission(id: string): Observable<Permission> {
    return this.http.get<Permission>(`${environment.apiUrl}/permissions/${id}`)
  }

  createPermission(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(`${environment.apiUrl}/permissions`, permission);
  }

  deletePermission(id: string): Observable<Permission> {
    return this.http.delete<Permission>(`${environment.apiUrl}/permissions/${id}`);
  }

  updatePermission(id: string, permission: Permission): Observable<Permission> {
    return this.http.put<Permission>(`${environment.apiUrl}/permissions/${id}`, permission);
  }
}
