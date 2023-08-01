import { EventEmitter, Injectable, isDevMode, Output } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth/auth.service';
import { RequestsPendingService } from '../services/requests/requests.service';
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService, private reqpendingservice: RequestsPendingService) { }
  pendingRequestsCount = 0;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('token');
    let request = req;
    this.pendingRequestsCount++;
    this.reqpendingservice.notify(this.pendingRequestsCount);

    request = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });

    return next.handle(request).pipe(
      finalize(() => {
        if (token && this.pendingRequestsCount > 0) this.pendingRequestsCount--;

        if ((this.pendingRequestsCount == 0)) {
          this.reqpendingservice.notify(this.pendingRequestsCount);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (token && this.pendingRequestsCount > 0) this.pendingRequestsCount--;
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }
        if ((this.pendingRequestsCount == 0)) {
          this.reqpendingservice.notify(this.pendingRequestsCount);
        }
        return throwError(err);
      }),
    );
  }
}
