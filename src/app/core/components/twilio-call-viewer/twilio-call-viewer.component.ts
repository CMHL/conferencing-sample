import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Observable, Subscription, take} from "rxjs";
import {
  connect,
  createLocalVideoTrack,
  LocalAudioTrackPublication,
  LocalVideoTrackPublication, RemoteAudioTrack,
  RemoteParticipant, RemoteTrack, RemoteVideoTrack,
  Room
} from "twilio-video";
import {LoggerService} from "../../services/logger.service";
import {Router} from "@angular/router";
import {BaseUser} from "../../models/base-user.models";
import {CallOptions} from "../../models/call-options.model";
import {Nullable, CallType, DeclinedState} from "../../types/types";
import {CallSetupService} from "../../services/call-setup.service";
import {PreviousRouteService} from "../../services/previous-route.service";
import {ConferencingService} from "../../services/conferencing.service";
import {HardwareService} from "../../services/hardware.service";



@Component({
  selector: 'app-twilio-call-viewer',
  templateUrl: './twilio-call-viewer.component.html',
  styleUrls: ['./twilio-call-viewer.component.css']
})
export class TwilioCallViewerComponent implements OnInit {
  private callAcceptedSubscription!: Subscription;
  private callDeclinedSubscription!: Subscription;
  private callEndedSubscription!: Subscription;
  private room!: Room;

  callInProgress = false;
  showVideo = false;
  statusMessage: string = '';
  localVideoEnabled = true;
  localAudioEnabled = true;
  isRecorded = false;
  autoAccept: boolean = false;
  acceptAfter: number = 0;

  @Input() callOptions!: CallOptions;
  @Input() remoteUser!: BaseUser;

  @ViewChild('callWaitingSound') callWaitingSound!: ElementRef;
  @ViewChild('callAcceptedSound') callAcceptedSound!: ElementRef;
  @ViewChild('callDeclinedSound') callDeclinedSound!: ElementRef;
  @ViewChild('localMediaContainer') localMediaContainer!: ElementRef;
  @ViewChild('remoteMediaContainer') remoteMediaContainer!: ElementRef;

  constructor(
    private logger: LoggerService,
    private renderer: Renderer2,
    private callSetupService: CallSetupService,
    private router: Router,
    private previousRoute: PreviousRouteService,
    private conferencingService: ConferencingService,
    private hardwareService: HardwareService
  ) {}

  ngOnInit(): void {
    const currentUser: BaseUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : undefined;
    console.log(`USER FROM STORE: ${currentUser.username}`);

    this.callOptions = {
      audioOnly: false,
      initiator: currentUser,
      target: this.remoteUser,
      roomName: `${currentUser.username}-to-${this.remoteUser.username}`,
    };

    this.callAcceptedSubscription = this.conferencingService.callAccepted$.subscribe((callOptions: CallOptions) => {
        this.callAccepted(callOptions);
    });

    this.callDeclinedSubscription = this.conferencingService.callDeclined$.subscribe((declinedState: DeclinedState) => {
      if (declinedState.isDeclined) {
        this.callDeclined(declinedState);
      }
    });

    this.callEndedSubscription = this.conferencingService.callEnded$.subscribe((callOptions: CallOptions) => {
        this.callEnded(callOptions);
    });
  }

  ngOnDestroy(): void {
    this.callAcceptedSubscription.unsubscribe();
    this.callDeclinedSubscription.unsubscribe();
    this.callEndedSubscription.unsubscribe();
  }

  toggleIsRecorded(): void {
    this.isRecorded = !this.isRecorded;
  }

  toggleAutoAccept(): void {
    this.autoAccept = !this.autoAccept;
  }

  changeAcceptAfter($event: any): void {
    console.log(`acceptAfter: ${$event.target.value}`);
    this.acceptAfter = $event.target.value;
  }

  requestAudioCall(): void {
    this.requestCall(true);
  }

  requestVideoCall(): void {
    this.requestCall(false);
  }

  async requestCall(
    audioOnly: boolean,
    enableRecording = this.isRecorded
  ): Promise<void> {
    this.callOptions = { ...this.callOptions, audioOnly, autoAccept: this.autoAccept, acceptAfter: this.acceptAfter };
    console.log(`callOptions: ${JSON.stringify(this.callOptions)}`);
    // Wake screen
    const residents = localStorage.getItem('residents') ? JSON.parse(localStorage.getItem('residents') as string) : [];
    const resident = residents.find((resident: any) => resident.username === this.remoteUser.username);
    this.statusMessage = 'Waking screen...';
    this.hardwareService.powerNormal(resident.set_top_box.id, true).subscribe( () => {
      console.log(`Screen powered on for ${resident.username}`);
      setTimeout(async () => {
        const room = await this.callSetupService.createRoom(
          this.callOptions.roomName,
          enableRecording,
          audioOnly
        );
        this.callInProgress = true;
        this.statusMessage = 'Calling...';
        this.callOptions.roomSid = room.sid;
        this.conferencingService.requestCall(this.callOptions);
        this.playWaitingSound();
      }, 1000);
    });
  }

  playWaitingSound(): void {
    const audio = this.callWaitingSound.nativeElement as HTMLAudioElement;
    audio
      .play()
      .then((value) => console.log('playing waiting sound'))
      .catch((error) => console.error('failed to play waiting sound'));
  }

  stopWaitingSound(): void {
    const audio = this.callWaitingSound.nativeElement as HTMLAudioElement;
    audio.pause();
    this.renderer.setProperty(
      this.callWaitingSound.nativeElement,
      'currentTime',
      0
    );
  }

  playAcceptedSound(): void {
    const audio = this.callAcceptedSound.nativeElement as HTMLAudioElement;
    audio
      .play()
      .then((value) => console.log('playing call accepted sound'))
      .catch((error) => console.error('failed to call accepted sound'));
  }

  stopAcceptedSound(): void {
    const audio = this.callAcceptedSound.nativeElement as HTMLAudioElement;
    audio.pause();
    this.renderer.setProperty(
      this.callAcceptedSound.nativeElement,
      'currentTime',
      0
    );
  }

  playDeclinedSound(): void {
    const audio = this.callDeclinedSound.nativeElement as HTMLAudioElement;
    audio
      .play()
      .then((value) => console.log('playing call declined sound'))
      .catch((error) => console.error('failed to call declined sound'));
  }

  stopDeclinedSound(): void {
    const audio = this.callDeclinedSound.nativeElement as HTMLAudioElement;
    audio.pause();
    this.renderer.setProperty(
      this.callDeclinedSound.nativeElement,
      'currentTime',
      0
    );
  }

  async callAccepted(callOptions: CallOptions): Promise<void> {
    this.stopWaitingSound();
    this.playAcceptedSound();
    this.logger.info(`call-viewer: Call Accepted`);
    this.statusMessage = 'Accepted!';
    this.showVideo = true;
    await this.setup();
    await this.joinCall(this.callOptions);
  }

  callDeclined(declinedState: DeclinedState): void {
    this.stopWaitingSound();
    this.playDeclinedSound();
    this.logger.info(`call-viewer : Call Declined`);
    this.statusMessage = this.getDeclineReason(declinedState);
    this.callInProgress = false;
  }

  getDeclineReason(declinedState: DeclinedState): string {
    switch (declinedState.reason) {
      case 'busy':
        return 'User Busy';
      case 'no-camera':
        return 'No Camera Detected'
      default:
        return 'User Declined Call'
    }
  }

  callEnded(callOptions?: CallOptions): void {
    this.stopWaitingSound();
    this.playDeclinedSound();
    this.statusMessage = 'Call ended';
    this.callInProgress = false;
    this.showVideo = false;
    this.finishCall();
  }

  endCall(): void {
    this.playDeclinedSound();
    this.conferencingService.endCall(this.callOptions);
    this.statusMessage = 'Call ended';
    this.callInProgress = false;
    this.showVideo = false;
    this.finishCall();
  }

  finishCall(): void {
    if (this.room !== undefined) {
      this.room.disconnect();
    }
    console.info(`previous route: ${this.previousRoute.getPreviousUrl()}`);
    window.location.replace(this.previousRoute.getPreviousUrl());
  }

  abortCall(): void {
    if (this.callInProgress) {
      this.endCall();
    } else {
      this.goBack();
    }
  }

  goBack(): void {
    this.router.navigate(["/"]);
  }

  toggleLocalVideoMuted(): void {
    this.localVideoEnabled = !this.localVideoEnabled;
    if (this.localVideoEnabled) {
      this.room.localParticipant.videoTracks.forEach(
        (publication: LocalVideoTrackPublication) => publication.track.enable()
      );
    } else {
      this.room.localParticipant.videoTracks.forEach(
        (publication: LocalVideoTrackPublication) => publication.track.disable()
      );
    }
  }

  toggleLocalAudioMuted(): void {
    this.localAudioEnabled = !this.localAudioEnabled;
    if (this.localAudioEnabled) {
      this.room.localParticipant.audioTracks.forEach(
        (publication: LocalAudioTrackPublication) => publication.track.enable()
      );
    } else {
      this.room.localParticipant.audioTracks.forEach(
        (publication: LocalAudioTrackPublication) => publication.track.disable()
      );
    }
  }

  async setup(): Promise<void> {
    const localVideoTrack = await createLocalVideoTrack({
      height: 720,
      width: 1280,
      frameRate: 24,
    });
    this.localMediaContainer.nativeElement.appendChild(
      localVideoTrack.attach()
    );
  }

  /**
   * join call
   */
  async joinCall(callOptions: CallOptions): Promise<void> {
    console.info(`room name: ${callOptions.roomName}`);

    const token: any = await this.callSetupService.getAccessToken(
      callOptions.roomName
    );
    console.info(`token: ${JSON.stringify(token)}`);

    this.room = await connect(token.token, {
      name: callOptions.roomName,
      audio: true,
      maxAudioBitrate: 16000,
      video: { height: 720, width: 1280, frameRate: 24 },
    });

    this.room.participants.forEach((participant) =>
      this.manageTracksForRemoteParticipant(participant)
    );

    // Wire-up event handlers.
    this.room.on(
      'participantConnected',
      this.onParticipantConnected.bind(this)
    );
    this.room.on(
      'participantDisconnected',
      this.onParticipantDisconnected.bind(this)
    );
  }

  attachAttachableTracksForRemoteParticipant(
    participant: RemoteParticipant
  ): void {
    participant.tracks.forEach((publication): void => {
      if (!publication.isSubscribed) {
        return;
      }

      if (!this.trackExistsAndIsAttachable(publication.track)) {
        return;
      }

      this.attachTrack(publication.track);
    });
  }

  attachTrack(track: RemoteAudioTrack | RemoteVideoTrack): void {
    this.remoteMediaContainer.nativeElement.appendChild(track.attach());
  }

  trackExistsAndIsAttachable(
    track?: Nullable<RemoteTrack>
  ): track is RemoteAudioTrack | RemoteVideoTrack {
    return (
      !!track &&
      ((track as RemoteAudioTrack).attach !== undefined ||
        (track as RemoteVideoTrack).attach !== undefined)
    );
  }

  onParticipantConnected(participant: RemoteParticipant): void {
    this.manageTracksForRemoteParticipant(participant);
  }

  onParticipantDisconnected(participant: RemoteParticipant): void {
    document.getElementById(participant.sid)?.remove();
  }

  onTrackSubscribed(track: RemoteTrack): void {
    if (!this.trackExistsAndIsAttachable(track)) {
      return;
    }

    this.attachTrack(track);
  }

  onTrackUnsubscribed(track: RemoteTrack): void {
    if (this.trackExistsAndIsAttachable(track)) {
      track.detach().forEach((element) => element.remove());
    }
  }

  manageTracksForRemoteParticipant(participant: RemoteParticipant): void {
    // Handle tracks that this participant has already published.
    this.attachAttachableTracksForRemoteParticipant(participant);

    // Handles tracks that this participant eventually publishes.
    participant.on('trackSubscribed', this.onTrackSubscribed.bind(this));
    participant.on('trackUnsubscribed', this.onTrackUnsubscribed.bind(this));
  }
}
