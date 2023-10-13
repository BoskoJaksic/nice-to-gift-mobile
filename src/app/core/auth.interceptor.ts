import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {from, mergeMap, Observable} from "rxjs";
import {StorageService} from "../shared/services/storage.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/token') || request.url.endsWith('/register')) {
      return next.handle(request);
    }

    return from(this.storageService.getToken('token')).pipe(
      mergeMap(token => {
        if (token) {
          const clonedRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            },
          });
          return next.handle(clonedRequest);

        }
        return next.handle(request);
      })
    );
  }
}
