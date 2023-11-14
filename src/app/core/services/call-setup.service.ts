import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseUser} from "../models/base-user.models";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CallSetupService {
  ACCESS_TOKEN_URL = `${environment.apiUrl.substring(
    0,
    environment.apiUrl.length - 3
  )}/conferencing/video-token/`;

  CREATE_ROOM_URL = `${environment.apiUrl}/conferencing-room`;


  constructor(private http: HttpClient) {}

  getAccessToken(roomName: string): Promise<any> {
    const user : BaseUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;

    const body = { username: user.username, room_name: roomName };
    return this.http.post(this.ACCESS_TOKEN_URL, body).toPromise();
  }

  createRoom(roomName: string, enableRecording: boolean, audioOnly: boolean): Promise<any> {
    const body = {
      unique_name: roomName,
      enable_recording: enableRecording,
      audio_only: audioOnly,
    };
    return this.http.post(this.CREATE_ROOM_URL, body).toPromise();
  }
}
