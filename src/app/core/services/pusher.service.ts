import { Injectable } from '@angular/core';
import Pusher, {Channel, ConnectionManager} from "pusher-js";
import {environment} from "../../../environments/environment";
import {LoggerService} from "./logger.service";

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  _enabled = false;
  // @ts-ignore
  pusher: Pusher;
  currentState = 'disconnected';
  socketId = '';

  constructor(
    private logger: LoggerService,
  ) {

  }

  public init(token: string): void {
    const pusherOptions = {
      cluster: 'eu',
      encrypted: true,
      authEndpoint: environment.apiUrl.slice(0, -3) + '/pusher/auth/',
      auth: {
        headers: {
          AUTHORIZATION: `Bearer ${token}`,
        },
      },
    };

    this.pusher = new Pusher(environment.pusherKey, pusherOptions);

    // Setup pusher
    this.pusher.connection.bind('state_change', (states: any) => {
      this.logger.info('pusher state: ' + states.current);
      this.currentState = states.current;
    });

    this.pusher.connection.bind('connected', () => {
      this.socketId = this.pusher.connection.socket_id;
      this.logger.info(`pusher connected! (${this.socketId})`);
    });
  }

  public disconnect(): void {
    this.pusher.disconnect();
  }

  public connectionBind(eventName: string, callback: Function): ConnectionManager {
    return this.pusher.connection.bind(eventName, function() {
      // @ts-ignore
      callback.apply(this.pusher, arguments);
    });
  }

  public subscribe(channelName: string): Channel {
    return this.pusher.subscribe(channelName);
  }

  public unsubscribe(channelName: string): void {
    if (
      this.pusher !== undefined &&
      this.pusher.allChannels().filter((channel: Channel) => channel.name === channelName).length > 0
    ) {
      return this.pusher.unsubscribe(channelName);
    }
  }

  public unsubscribeAll(): void {
    this.pusher.channels.all().forEach((channel: Channel) => {
      this.pusher.unsubscribe(channel.name);
    });
  }

  public bindChannelEvent(channel: Channel, eventName: string, callback: Function): Channel {
    return channel.bind(eventName, function() {
      // @ts-ignore
      callback.apply(this.pusher, arguments)
    });
  }

  public bindAllChannelEvent(channel: Channel, callback: Function): Channel {
      return channel.bind_global(function() {
        // @ts-ignore
        callback.apply(this.pusher, arguments);
      });
  }

  public unbindChannelEvent(channel: Channel, eventName: string, callback: Function): Channel {
    return channel.unbind(eventName, function () {
      // @ts-ignore
      callback.apply(this.pusher);
    });
  }

  public channelUnbindAll(channel: Channel): Channel {
    return channel.unbind();
  }

  public channel(channelName: string): Channel {
    return this.pusher.channel(channelName);
  }

  public allChannels(): Channel[] {
    return this.pusher.allChannels();
  }

  public getSocketId(): string {
    return this.pusher.connection.socket_id;
  }

  public getCurrentState(): string {
    return this.currentState;
  }
}
