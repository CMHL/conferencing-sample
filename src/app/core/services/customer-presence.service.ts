import { Injectable } from '@angular/core';
import {Channel} from "pusher-js";
import {LoggerService} from "./logger.service";
import {PusherService} from "./pusher.service";
import {Customer} from "../models/customer.model";
import {Resident} from "../models/resident.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerPresenceService {
  // @ts-ignore
  channel: Channel;
  channelName: string = '';

  constructor(
    private logger: LoggerService,
    private pusher: PusherService,
  ) {}

  public subscribe(customer: Customer) {
    this.channelName = `private-presence-${customer.id}`;
    this.channel = this.pusher.subscribe(this.channelName);

    this.pusher.bindChannelEvent(
      this.channel,
      'pusher:subscription_succeeded',
      (channel: Channel) => {
        this.logger.info(
          'Customer presence channel subscription succeeded: ' +
          this.channel.name
        );
        // this.store$.dispatch(
        //   PusherActions.subscribeCustomerChannelSuccess({
        //     channelName: this.channel.name,
        //   })
        // );
        // this.store$.dispatch(PresenceActions.getOnlineCustomerUsers());
      }
    );

    this.pusher.bindChannelEvent(
      this.channel,
      'pusher:subscription_error',
      (status: string) => {
        this.logger.error(
          'Customer presence channel subscription FAILED: ' + this.channel.name
        );
        this.logger.error(status);
      }
    );

    this.pusher.bindChannelEvent(
      this.channel,
      'resident_updated',
      (resident: Resident) => {
        this.logger.info(
          `resident updated over ws: ${JSON.stringify(resident.id)}`
        );
        // this.store$.dispatch(
        //   ResidentActions.refreshResidentSuccess({ resident })
        // );
      }
    );

    this.pusher.bindAllChannelEvent(this.channel, (event: string, data: any) => {
      if (event !== undefined) {
        const tokens = event.split('_');
        if (tokens[0] === 'presence' && tokens[1] === 'update') {
          const userId = parseInt(tokens[2], 10);
          const user = data;
          this.logger.info(
            `customer presence: ${user.username} is ${
              user.online ? 'online' : 'offline'
            }`
          );
          // if (user.online) {
          //   this.store$.dispatch(PresenceActions.customerUserOnline(user));
          // } else {
          //   this.store$.dispatch(PresenceActions.customerUserOffline(user));
          // }
        } else {
          console.warn('uncaught event: ' + event);
        }
      } else {
        console.warn('uncaught event: ' + event);
      }
    });
  }

  public unsubscribe() {
    this.pusher.unsubscribe(this.channelName);
    this.logger.info('Unsubscribed customer presence channel');
  }
}
