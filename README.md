# Integrators Conferencing Sample App

This sample Angular application demonstrating how to use the [Chatta API](http://docs.caremessenger.co.uk) to create a video conferencing application.

See [Hierachy Overview](https://docs.caremessenger.co.uk/introduction.html#overview) for an explanation of high level objects.

### NOTE: This repositroy is a work in progress, please check back for updates.

## Usage

### Prerequisites
Requires Node  >= 16
 
### Build Steps

1. Clone the repository
2. Edit src/app/app.component.ts and on line 25 enter username and password for an administrator account under your organisation.
3. Start the application with the below

```angular2html
  npm install
  ng serve -c staging
```

## Overview of request flow to make conferencing call

### 1. Login as an Administrator for your Customer

See [Auth Service](src/app/core/services/auth.service.ts) for example.

Request Type: POST

Content Type: application/json

URL: https://api-demo.caremessenger.co.uk/api-token-auth/

Authentication: None

Body:
```json
  {"username": "<your_username>", "password": "<your_password>"}
```

Sample Response:
```
  {
	"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0MywidXNlcm5hbWUiOiJpc3B5X2FkdeluIiwiZXhwIjoxNzMzMDg4MTE4LCJlbWFpbCI6ImlzcHlfYWRtaW5AdGVzdC5jb20iLCJvcmlnX2lhdCI6MTcxNzUzNjExOH0.TE-5BsDdms38AGM7o3AdwDdrRWZP9Zb4fpHNOXR8-RA",
	"user": {
		"id": 5,
		"online": false,
		"user_type": "customeradmin",
		"username": "<your_username>",
		"customer": 7,
		"email": "<your_username>@test.com",
		"slug": "<your_username>",
		"first_name": "Your",
		"last_name": "Username",
		"is_active": true,
		"date_joined": "2014-01-22T09:59:06.787511Z",
		"locale": "en-GB",
		"time_zone": "Europe/London",
		"avatar": "<path_to_image>",
		"avatar_original": "<path_to_image>",
		"avatar_thumb": "<path_to_image>",
		"avatar_large": "<path_to_image>"
	}
}
```

- Store the value of the `token` field from the response, this JWT must be presented in an Authorization header prefixed with `Bearer` on the following requests to be able to authenticate.
- Also note the id for your customer.

### 2. Get your Customer object

See [Customer Service](src/app/core/services/customer.service.ts) for example.

Request Type: GET

Content Type: application/json

URL: https://api-demo.caremessenger.co.uk/v2/customer/<customer_id>

Authentication: Authorization header with value of `Bearer <token>`

Sample Response:
```json
{
	"id": 7,
	"name": "Acme Corp",
	"slug": "acme-corp",
	"website": "",
	"is_active": true,
	"use_own_branding": false,
	"settings_menu_label": "Chatta",
	"assistance_menu_label": "Request Assistance",
	"settings_enabled": true,
	"assistance_enabled": true,
	"support_phone": "0161 123456",
	"support_url": "support.acme.com",
	"sites": [
		9,
		39,
		40,
		41,
		42,
		43
	],
	"created": "2014-01-22T09:45:55.012295Z",
	"modified": "2022-09-19T22:06:57.963689Z",
	"logo": "",
	"logo_original": "<path_to_image>",
	"logo_thumb": "<path_to_image>",
	"logo_large": "<path_to_image>",
	"resident_count": 12
}
```

### 3. Get Online Residents

See [Resident Service](src/app/core/services/resident.service.ts) for example.

Request Type: GET

Content Type: application/json

URL: https://api-demo.caremessenger.co.uk/v2/resident?customer=<customer_id>&online=true

Authentication: Authorization header with value of `Bearer <token>`

Sample Response:
``` json
  {
	"count": 2,
	"next": null,
	"previous": null,
	"results": [
		{
			"id": 1124,
			"online": true,
			"user_type": "resident",
			"username": "chattademo",
			"customer": { ... },
			"site": {
				"id": 115,
				"name": "Internal Testers",
				"slug": "internal-testers",
				"customer": 47,
				"created": "2022-04-04T21:11:13.574744Z",
				"modified": "2022-04-04T21:11:13.574744Z",
				"lat": null,
				"lon": null,
				"is_active": true,
				"calendar": 115,
				"resident_count": 14,
				"firmware_release": 15
			},
			"email": "chattademo@caremessenger.co.uk",
			"slug": "chattademo",
			"first_name": "CMHL",
			"last_name": "Chatta",
			"is_active": true,
			"date_joined": "2022-07-06T13:50:25.626018Z",
			"locale": "en-GB",
			"time_zone": "Europe/London",
			"gender": "male",
			"hardware_id": "74:E6:B8:84:9E:4D",
			"deliver_to_inbox": true,
			"is_assistance_active": true,
			"avatar": "<path_to_image>",
			"avatar_thumb": "<path_to_image>",
			"avatar_large": "<path_to_image>",
			"avatar_original": "<path_to_image>",
			"set_top_box": {
				"id": 322,
				"resident": 1124,
				"hardware_id": "74:E6:B8:84:9E:4D",
				"ip_address": null,
				"serial_number": "205MAUAAGC62",
				"model_number": "43US662H9ZC",
				"status": "stock",
				"is_active": true,
				"av_inputs": [ ... ],
				"current_messenger_version": "",
				"current_sunrise_version": "",
				"logging_enabled": false,
				"av_key_enabled": true,
				"menu_key_enabled": true,
				"default_av_input": "",
				"firmware_version": "08.18.13"
			},
			"supporters": [
				829,
				1132
			]
		},
		{
			"id": 1137,
			"online": true,
			"user_type": "resident",
			"username": "chattaremote",
			"customer": { ... },
			"site": {
				"id": 115,
				"name": "Internal Testers",
				"slug": "internal-testers",
				"customer": 47,
				"created": "2022-04-04T21:11:13.574744Z",
				"modified": "2022-04-04T21:11:13.574744Z",
				"lat": null,
				"lon": null,
				"is_active": true,
				"calendar": 115,
				"resident_count": 14,
				"firmware_release": 15
			},
			"email": "chattaremote@caremessenger.co.uk",
			"slug": "chattaremote",
			"first_name": "Chatta",
			"last_name": "Remote",
			"is_active": true,
			"date_joined": "2022-10-02T19:03:30.937750Z",
			"locale": "en-GB",
			"time_zone": "Europe/London",
			"gender": "male",
			"hardware_id": "A0:B1:C2:D3:E4:F5",
			"deliver_to_inbox": true,
			"is_assistance_active": true,
			"avatar": null,
			"avatar_thumb": "",
			"avatar_large": "",
			"avatar_original": "",
			"set_top_box": {
				"id": 335,
				"resident": 1137,
				"hardware_id": "A0:B1:C2:D3:E4:F5",
				"ip_address": null,
				"serial_number": "104MASX1XH90",
				"model_number": "43US662H0ZC",
				"status": "stock",
				"is_active": true,
				"av_inputs": [ ... ],
				"current_messenger_version": "",
				"current_sunrise_version": "",
				"logging_enabled": false,
				"av_key_enabled": true,
				"menu_key_enabled": true,
				"default_av_input": "",
				"firmware_version": "04.21.90"
			},
			"supporters": [
				829
			]
		}
	]
}
```

This response will give you an array of residents who are currently online, store this list of resident's in your client side state container of choice... Redux, localStorage etc.

### 4. Connect to Pusher

Install the [pusher-js](https://www.npmjs.com/package/pusher-js) library from npm

See [Pusher Service](src/app/core/services/pusher.service.ts) for example.

```javascript
  import Pusher, {Channel, ConnectionManager} from "pusher-js";

  export class PusherService {
    pusher: Pusher;
    socketId: string;
    currentState: string;

    public init(token: string): void {
      const pusherOptions = {
        cluster: 'eu',
        encrypted: true,
        authEndpoint: 'https:/api-demo.caremessenger.co.uk/pusher/auth/',
        auth: {
          headers: {
            AUTHORIZATION: `Bearer ${token}`,
          },
        },
      };
  
      this.pusher = new Pusher(<pusher_key>, pusherOptions);
  
      this.pusher.connection.bind('state_change', (states: any) => {
        this.logger.info(`pusher state: ${states.current}`);
        this.currentState = states.current;
      });
  
      this.pusher.connection.bind('connected', () => {
        this.socketId = this.pusher.connection.socket_id;
        this.logger.info(`pusher connected! (${this.socketId})`);
      });
    }
  }
```

### 5. Subscribe to the presence channel for your customer

See [Customer Presence Service](src/app/core/services/customer-presence.service.ts) from an example

Once we have a connection to pusher, we need to subscribe to the correct channel and events to receive notification of presence events over the websocket.  Whenever any attribute related to a given resident account associated with your customer account changes (including going online/offline), an event will be published over the websocket, it's payload will be the full resident object which you can add/update in your client side state store.

Channel Name: `private-presence-<customer_id>`

Note in this case the channel name starts with the word `private`.  This denotes a channel that requires an authorization check to establish if you are permissioned to subscribe to it.  As such on attempting to subscribe to this channel, a HTTP call will automatically be made to the care messenger API to check authorization.  If authorized, your subscription attempt will be successful.

```typescript
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
      }
    );
```

Once subscribed to the channel, you now need to bind to the following event

Event Name: `resident_updated`

```typescript
  this.pusher.bindChannelEvent(
      this.channel,
      'resident_updated',
      (resident: Resident) => {
        this.logger.info(
          `resident updated over ws: ${JSON.stringify(resident.id)}`
        );
        // TODO: Update resident object in state
      }
    );
```

### 6. Subscribe to the conferencing channel for you customer

See [Conferencing Service](src/app/core/services/conferencing.service.ts) for an example.

Channel Name: `private-call-<customer_id>`

```typescript
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
```

This channel we will both subscribe and publish events to.

#### Outbound Events (Publish)

##### Request Call Event

Event Name : `client-conferencing-call-requested-<resident_id>`

Note this event starts with the word `client`, this denotes an event that is sent directly over the websocket to any other parties bound to the same channel, without any interaction or validation with server side API.

The `resident_id` in this event name, is the name of the resident we would like to request an audio/video call with.

When publishing this event, we pass a [CallOptions](src/app/core/models/call-options.model.ts) object as the payload, the interface for this object is as follows

```typescript
  export interface CallOptions {
    initiator?: any; // The user requesting the call, could be a Customer Admin or Supporter account
    target?: any; // The Resident you are requesting a call with
    audioOnly?: boolean; // set to true to disable video
    declineReason?: string; // Populated if the target declines the call (call declined, user busy, camera not available etc.)
    roomName: string; // the name the conferencing room
    roomSid?: string; // the uuid of the conferencing room
    autoAccept?: boolean; // if true, the target will not be asked if they want to start the call, screen will be woken remotely and call started without interaction
    acceptAfter?: number; // if autoAccept === true && acceptAfter > 0, a dialog will be dislayed with acceptAfter seconds countdown before call is started 
  } 
```

For example, to request a call with resident

```typescript
  requestCall(channelName: string, currentUser: BaseUser, resident: Resident): boolean {
    const callOptions: CallOptions = {
      initiator: currentUser, // user object returned from login endpoint
      target: resident, // a resident from online residents call
      audioOnly: false, // video call
      autoAccept: false // allow target to accept/decline call via model dialog
    };

    this.logger.info(`Requesting call with ${callOptions.target.username}`);
    const eventName = `client-conferencing-call-requested-${callOptions.target.id}`;
    const channel = this.pusher.channel(this.channelName);
    return channel.trigger(eventName, callOptions);
  }
```

##### Call Ended Event

Event Name: `client-conferencing-call-ended-<resident_id>`

Notify the remote target that you ended (hung up) the call

We publish this event when user wishes to end the call, and therefore needs to notify the target of the action.

```typescript
  callEnded(channelName: string, callOptions: CallOptions): boolean {
    const channel = this.pusher.channel(this.channelName);
    return channel.trigger(
      'client-conferencing-call-ended-' + callOptions.target.id,
      callOptions
    );
  }
```

#### Inbound Events (Subscribe)

Inbound events will be triggered after a call request is made, and the intended target has taken some action.

##### Call Accepted Event

Event Name: `client-conferencing-call-accepted-<initiator_id>`

This event will be triggered when either the target explicitly accepts the call, or autoAccept was set in call options and the remote screen starts call setup. 

```typescript
  // Call accepted inbound event
  const callAcceptedEventName = `client-conferencing-call-accepted-${initiator.id}`;
  this.logger.debug(`Listening on ${callAcceptedEventName}`);
  this.pusher.bindChannelEvent(
    channel,
    callAcceptedEventName,
    (callOptions: CallOptions) => {
      this.logger.info(`pusher event: call ACCEPTED`);
      // TODO: propogate this event to any components that need to be notified
    }
  );
```

##### Call Declined Event

Event Name: `client-conferencing-call-declined-<initiator_id>`

Triggered if the target explicitly declined the call, the user was busy, the target screen didn't have the required hardware available, or an exception was thown during call setup. The `declineReason` in `callOptions` will provide detail of why call was declined.  

```typescript
  // Call declined inbound event
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
      // TODO: propogate this event to any components that need to be notified
    }
  );
```

##### Call Ended Event

Event Name: `client-conferencing-call-ended-<initiator_id>`

Triggered when the remote target ends the call

```typescript
  // Call ended inbound event
  const callEndedEventName = `client-conferencing-call-ended-${user.id}`;
  this.logger.debug(`Listening on ${callEndedEventName}`);
  this.pusher.bindChannelEvent(
    channel,
    callEndedEventName,
    (callOptions: CallOptions) => {
      this.logger.info(`pusher event: call ENDED`);
      // TODO: propogate this event to any components that need to be notified
    }
  );
```

## Putting it together 

See [here](src/app/app.component.ts) for how the sample client application triggers this sequence of steps on application load, simply using `localStorage` to store the result of HTTP calls.

```typescript
    // login as admin
    this.authService.login('<username>', '<password>').subscribe((response) => {
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
```

This sequence of calls initializes the application by authenticating, persisting minimum required state to function, then binding to necessary websocket channels to both listen for and publish events.

At this point we are ready to start building UI elements to allow the user to trigger defined service methods, and react to any inbound events.

See [Call Viewer Component](src/app/core/components/twilio-call-viewer) for an example of how this might be implemented.


