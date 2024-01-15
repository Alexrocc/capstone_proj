import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, take, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  newReq!: HttpRequest<any>;

  constructor(private authSrv: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authSrv.user$.pipe(
      take(1),
      switchMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        this.newReq = request.clone({
          headers: request.headers.set(
            'Authorization',
            `Bearer ${user.accessToken}`
          ),
        });

        return next.handle(this.newReq);
      })
    );
  }
}
