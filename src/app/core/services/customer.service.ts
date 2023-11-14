import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { Customer } from "../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  endpointUrl: string = environment.apiUrl + '/customer';

  constructor(private http: HttpClient) {}

  getCustomer(customerId: number) {
    return this.http
      .get<Customer>(this.endpointUrl + '/' + customerId)
      .pipe(catchError(this.handleError));
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
