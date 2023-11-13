import { Injectable } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";

import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginResponse } from "../models/login";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(email: string, password: string) {
    let url = environment.apiUrl.slice(0, -3) + '/api-token-auth/';
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ username: email, password: password });

    return this.http.post(url, body, { headers }).pipe(
      map(this.extractAndStoreToken, this),
      map((user) => {
        setTimeout(() => console.info('logged in'), 2000);
        return user;
      }),
      catchError(this.handleError)
    );
  }

  getNewJwt(token: string)  : Observable<any> {
    // Get a new JWT using the token saved in local storage
    let url = environment.apiUrl.slice(0, -3) + '/api-token-refresh/';
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ token });
    return this.http.post<LoginResponse>(url, body, { headers }).pipe(
      map((response: LoginResponse) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private extractAndStoreToken(data: any) {
    return data || {};
  }

  private handleError(error: any) {
    let errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';
    console.error(errMsg); // log to console instead
    return throwError(errMsg);
  }
}
