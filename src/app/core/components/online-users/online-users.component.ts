import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Resident} from "../../models/resident.model";
import {ResidentService} from "../../services/resident.service";

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent {
  onlineResidents$: Observable<Resident[]> | undefined;

  constructor(private residentService: ResidentService) {
    const customer = JSON.parse(localStorage.getItem('customer') || '{}');
    // get online residents
    this.onlineResidents$ = this.residentService.getOnlineResidents(customer);
  }
}
