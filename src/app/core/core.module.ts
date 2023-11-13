import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import {PusherService} from "./services/pusher.service";
import {AuthService} from "./services/auth.service";
import {LoggerService} from "./services/logger.service";
import {ResidentService} from "./services/resident.service";
import {CustomerService} from "./services/customer.service";
import {ConferencingService} from "./services/conferencing.service";
import {CustomerPresenceService} from "./services/customer-presence.service";
import { TwilioCallViewerComponent } from './components/twilio-call-viewer/twilio-call-viewer.component';
import { CallSetupService } from './services/call-setup.service';
import {PreviousRouteService} from "./services/previous-route.service";
import { AvatarThumbnailComponent } from './components/avatar-thumbnail/avatar-thumbnail.component';
import { OnlineUsersComponent } from './components/online-users/online-users.component';


@NgModule({
  declarations: [
    TwilioCallViewerComponent,
    AvatarThumbnailComponent,
    OnlineUsersComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  providers: [
    AuthService,
    PusherService,
    LoggerService,
    ResidentService,
    CustomerService,
    ConferencingService,
    CustomerPresenceService,
    CallSetupService,
    PreviousRouteService
  ],
  exports: [
    TwilioCallViewerComponent,
    AvatarThumbnailComponent
  ]
})
export class CoreModule { }
