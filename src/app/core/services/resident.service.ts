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
  getResidentsForSite(customerId: number, siteId: number) {
    let params = new HttpParams();
    params = params.set('customer', customerId);
    params = params.set('site', siteId.toString());
    params = params.set('ordering', 'last_name');
    return this.http
      .get<ApiResponse<Resident>>(this.endpointUrl, { params })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getResidentsForCustomer(customerId: number) {
    let params = new HttpParams();
    params = params.set('customer', customerId as number);
    params = params.set('ordering', 'last_name');
    return this.http
      .get<ApiResponse<Resident>>(this.endpointUrl, { params })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getResident(residentId: number) {
    return this.http.get<Resident>(this.endpointUrl + '/' + residentId);
  }

  updateResident(resident: Resident) {
    return this.http.patch(`${this.endpointUrl}/${resident.id}`, resident);
  }

  deleteResident(resident: Resident) {
    const url = `${this.endpointUrl}/${resident.id}`;
    return this.http.delete(url);
  }

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
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';
    console.error(errMsg); // log to console instead
    return throwError(errMsg);
  }
}
