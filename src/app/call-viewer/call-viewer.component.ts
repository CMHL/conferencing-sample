import { Component } from '@angular/core';
import {CallType} from "../core/types/types";
import {BaseUser} from "../core/models/base-user.models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-call-viewer',
  templateUrl: './call-viewer.component.html',
  styleUrls: ['./call-viewer.component.css']
})
export class CallViewerComponent {
  callType!: CallType;
  remoteUser!: BaseUser;

  constructor(
    private router: Router
  ) {
    // @ts-ignore
    this.remoteUser = this.router.getCurrentNavigation() ? this.router.getCurrentNavigation().extras.state: undefined;
  }
}
