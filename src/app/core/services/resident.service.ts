import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Customer} from "../models/customer.model";
import {ApiResponse} from "../models/api-response.model";
import {Resident} from "../models/resident.model";
import {environment} from "../../../environments/environment";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  endpointUrl: string = environment.apiUrl + '/resident';
  constructor(
    private http: HttpClient,
  ) {}

  getOnlineResidents(customer: Customer): Observable<Resident[]> {
    let params = new HttpParams();
    params = params.set('online', 'true');
    params = params.set('customer', customer.id as number);
    return this.http
      .get(this.endpointUrl, { params })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private extractData(data: any) {
    return data.results || {};
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
