# Importing the TrackMe MongoDB Stitch Backend code & configuration

*Tuesday, 13th March 2018*

**Not for production**

It's now possible to import the application's backend MongoDB Stitch code and configuration (so that you don't need to follow all of the UI steps to create it by hand). These instructions step through getting the app up and running. Note that you will still need to provide your own Twilio, Google, and Facebook API credentials.

[Download and install the `stitch-cli` command](https://docs.mongodb.com/stitch/import-export/stitch-cli-reference/#installation "MongoDB Stitch CLI to export and import backend applications").

If you haven't already, create a [MongoDB Atlas cluster](https://www.mongodb.com/cloud/atlas "MongoDB Atlas - Database as a Service") (a free tier is available).

Download the TrackMe app code and config data:

```bash
git clone git@github.com:am-MongoDB/trackme_MongoDB_Stitch.git
cd trackme_MongoDB_Stitch
```

Identify all of the places where you'll need to add your own API credentials:

```bash
grep -r TODO *
src/config.js:  appId: "TODO: Find this in your MongoDB Stitch console after you create or import the app"
stitch_app/trackme/auth_providers/oauth2-facebook.json:        "clientId": "TODO: Get this from your Facebook dev console"
stitch_app/trackme/auth_providers/oauth2-google.json:        "clientId": "TODO: Get this from your Google API dev console"
stitch_app/trackme/values/GoogleMapsStaticKey.json:    "value": "TODO: Get this from your Google dev console",
stitch_app/trackme/values/twilioNumber.json:    "value": "TODO: Get this from your Twilio account",
stitch_app/trackme/secrets.json:      "clientSecret": "TODO: Get this from your Facebook dev console"
stitch_app/trackme/secrets.json:      "clientSecret": "TODO: Get this from your Google API dev console"
stitch_app/trackme/secrets.json:      "auth_token": "TODO: Get this from your Twilio account"
stitch_app/trackme/services/mongodb-atlas/config.json:        "clusterName": "TODO: This should be the name of your Atlas cluster - e.g. Cluster0"
stitch_app/trackme/services/myTwilio/config.json:        "sid": "TODO: Get this from your Twilio console"
```

Add all of your API credentials, apart for the `appId` in `src/config.js` (you won't have that value until you import the app backend).

For the next step, you need to find your *Project ID* from the settings section in the Atlas UI. Under your account settings, whitelist your IP address in the *Public API Access* tab; while you're their, create and take note of a new API key.

You can now import the application:

```bash
cd stitch_app/trackme/
stitch-cli login --username=andrew.morgan --api-key=<your Atlas API key goes here>
stitch-cli import
this app does not exist yet: would you like to create a new app? [y/n]: y
Atlas Group ID: 574423c3e4b0ba1b3xxxxx
App name: trackme
New app created: trackme-etjzr
Successfully imported 'trackme-etjzr'
```

Take a note of the new *App ID* (`trackme-xxxxx`) and add it to `srtc/config.js`.

Check that you haven't missed adding any credentials:

```bash
cd ../..
grep -r TODO *
```

Install the dependencies for the application frontend and launch the frontend app:

```bash
npm install
npm start
```