import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {LoggerService} from "./logger.service";
import {PusherService} from "./pusher.service";
import {Customer} from "../models/customer.model";
import {BaseUser} from "../models/base-user.models";
import {CallOptions} from "../models/call-options.model";
import {DeclinedState} from "../types/types";


@Injectable({
  providedIn: 'root'
})
export class ConferencingService {
  private channelName = 'private-call-';

  private callAcceptedSource: Subject<CallOptions> = new Subject();
  private callDeclinedSource: Subject<DeclinedState> = new Subject();
  private callEndedSource: Subject<CallOptions> = new Subject();

  callAccepted$: Observable<CallOptions> = this.callAcceptedSource.asObservable();
  callDeclined$: Observable<DeclinedState> = this.callDeclinedSource.asObservable();
  callEnded$: Observable<CallOptions> = this.callEndedSource.asObservable();

  constructor(
    private logger: LoggerService,
    private pusher: PusherService
  ) {}

  subscribe(customer: Customer, user: BaseUser): void {
    this.channelName = `private-call-${customer.id}`;
    const channel = this.pusher.subscribe(this.channelName);

    this.pusher.bindChannelEvent(
      channel,
      'pusher:subscription_succeeded',
      (data: any) => {
        this.logger.info(
          `Customer call channel subscription succeeded: ${this.channelName}`
        );
      }
    );

    this.pusher.bindChannelEvent(
      channel,
      'pusher:subscription_error',
      (error: Error) => {
        this.logger.error(
          `Customer call channel subscription FAILED: ${this.channelName}`
        );
        this.logger.error(error.message);
      }
    );

    this.logger.debug(
      `Binding to call events with ${user.username} and id ${user.id}`
    );

    // Call accepted incoming event
    const callAcceptedEventName = `client-conferencing-call-accepted-${user.id}`;
    this.logger.debug(`Listening on ${callAcceptedEventName}`);
    this.pusher.bindChannelEvent(
      channel,
      callAcceptedEventName,
      (callOptions: CallOptions) => {
        this.logger.info(`pusher event: call ACCEPTED`);
        this.callAcceptedSource.next(callOptions);
      }
    );

    // Call declined incoming event
    const callDeclinedEventName = `client-conferencing-call-declined-${user.id}`;
    this.logger.debug(`Listening on ${callDeclinedEventName}`);
    this.pusher.bindChannelEvent(
      channel,
      callDeclinedEventName,
      (callOptions: CallOptions) => {
        this.logger.info(`pusher event: call DECLINED`);
        const declineState: DeclinedState = {
          isDeclined: true,
          reason: (callOptions.declineReason as string),
        };
        this.callDeclinedSource.next(declineState);
      }
    );

    // Call ended incoming event
    const callEndedEventName = `client-conferencing-call-ended-${user.id}`;
    this.logger.debug(`Listening on ${callEndedEventName}`);
    this.pusher.bindChannelEvent(
      channel,
      callEndedEventName,
      (callOptions: CallOptions) => {
        this.logger.info(`pusher event: call ENDED`);
        this.callEndedSource.next(callOptions);
      }
    );
  }

  unsubscribe(channelName: string): void {
    this.pusher.unsubscribe(channelName);
  }


  // requestCall and endCall are both outbound notifications.

  requestCall(callOptions: CallOptions): boolean {
    this.logger.info(`Requesting call with ${callOptions.target.username}`);
    const eventName = `client-conferencing-call-requested-${callOptions.target.id}`;
    this.logger.info(`eventName: ${eventName}`);
    const channel = this.pusher.channel(this.channelName);
    return channel.trigger(eventName, callOptions);
  }

  endCall(callOptions: CallOptions): boolean {
    const channel = this.pusher.channel(this.channelName);
    return channel.trigger(
      'client-conferencing-call-ended-' + callOptions.target.id,
      callOptions
    );
  }
}
