export interface CallOptions {
  initiator?: any;
  target?: any;
  audioOnly?: boolean;
  declineReason?: string;
  roomName: string;
  roomSid?: string;
}
