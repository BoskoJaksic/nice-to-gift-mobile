import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Authentication} from "../../shared/model/authentication";


@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor(private readonly httpClient: HttpClient) {
  }

  private readonly baseUrl: string = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/protocol/openid-connect`;
  private readonly tokenUrl: string = 'token';


  public login(username: string, password: string): Observable<Authentication> {
    const body = new URLSearchParams();
    body.set('client_id', environment.keycloak.clientId);
    body.set('client_secret', environment.keycloak.client_secret);
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);

    return this.sendUrlEncodedRequest<Authentication>(body, this.tokenUrl);
  }

  public refreshToken(refreshToken: string): Observable<Authentication> {
    const body = new URLSearchParams();
    body.set('client_id', environment.keycloak.clientId);
    body.set('client_secret', environment.keycloak.client_secret);
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refreshToken);

    return this.sendUrlEncodedRequest<Authentication>(body, this.tokenUrl);
  }

  public logout(refreshToken: string,url:string): Observable<void> {
    const body = new URLSearchParams();
    body.set('client_id', environment.keycloak.clientId);
    body.set('client_secret', environment.keycloak.client_secret);
    body.set('refresh_token', refreshToken);

    return this.sendUrlEncodedRequest<void>(body,url);
  }
  private sendUrlEncodedRequest<Type>(body: URLSearchParams, url: string): Observable<Type> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const options = { headers: headers };

    return this.httpClient.post<Type>(
      this.baseUrl + `/${url}`, body, options
    );
  }
}
