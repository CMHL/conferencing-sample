# Integrators Conferencing Sample App

This sample Angular application demonstrating how to use the [Chatta API](http://docs.caremessenger.co.uk) to create a video conferencing application.

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

See [Auth Service](src/app/core/services/resident.service.ts) for example.

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
### 6. Subscribe to the conferencing channel for you customer

```typescript
    // login as admin
    this.authService.login('roger_chatta_admin', 'password').subscribe((response) => {
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
```

More to follow
