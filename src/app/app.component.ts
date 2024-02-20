import { Component } from '@angular/core';
import {AuthService} from "./core/services/auth.service";
import {PusherService} from "./core/services/pusher.service";
import {ResidentService} from "./core/services/resident.service";
import {CustomerService} from "./core/services/customer.service";
import {Observable} from "rxjs";
import {Resident} from "./core/models/resident.model";
import {CustomerPresenceService} from "./core/services/customer-presence.service";
import {ConferencingService} from "./core/services/conferencing.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cm-conf-client';
  onlineResidents$: Observable<Resident[]> | undefined;

  constructor(private authService: AuthService, private pusherService: PusherService,
              private residentService: ResidentService, private customerService: CustomerService,
              private customerPresenceService: CustomerPresenceService,
              private conferencingService: ConferencingService) {
    // login as admin
    this.authService.login('archangel_admin', 'archangel').subscribe((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      // get customer object
      this.customerService.getCustomer(response.user.customer).subscribe((customer) => {
        localStorage.setItem('customer', JSON.stringify(customer));
        // get online residents
        this.onlineResidents$ = this.residentService.getOnlineResidents(customer);
        // Connect to Pusher
        this.pusherService.init(response.token);
        // Subscribe to customer presence channel
        this.customerPresenceService.subscribe(customer);
        // Subscribe to customer conferencing channel
        this.conferencingService.subscribe(customer, response.user);
      });
    });
  }
}
