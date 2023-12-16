import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {KeycloakService} from "./keycloack/keycloack.service";
import {AppPathService} from "../services/app-path.service";
import {CommonService} from "../services/common.service";
import {LocalStorageService} from "../shared/services/local-storage.service";
import {UserApiServices} from "../shared/services/user.api.services";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService,
              private appPathService: AppPathService,
              private userApiServices: UserApiServices,
              private localStorageService: LocalStorageService,
              public commonService: CommonService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getUserToken();
    let ifLoggedIn = this.userApiServices.isUserLoggedIn();

    if (!ifLoggedIn){
      return next.handle(request);
    }
    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let userRefreshToken = this.localStorageService.getUserRefreshToken()
    return this.keycloakService.refreshToken(userRefreshToken).pipe(
      switchMap((response: any) => {
        const newToken = response.access_token;
        const newRefreshToken = response.refresh_token;

        if (newToken && newRefreshToken) {
          this.localStorageService.setUserToken(newToken);
          this.localStorageService.setUserRefreshToken(newRefreshToken);
          const newRequest = this.addToken(request, newToken);
          return next.handle(newRequest);
        }
        this.appPathService.setAppPath('');
        this.commonService.goToRoute('/')
        return throwError('Neuspjelo osvježavanje tokena');
      }),
      catchError((error) => {
        this.appPathService.setAppPath('');
        this.commonService.goToRoute('/')
        return throwError(error);
      })
    );
  }
}

