import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HardwareService {
  endpointUrl: string = environment.apiUrl + '/set-top-box';

  constructor(private http: HttpClient) { }

  powerNormal(id: number, force: boolean) {
    return this.http
      .patch(`${this.endpointUrl}/${id}/power_normal?force=${force}`, {});
  }
}
