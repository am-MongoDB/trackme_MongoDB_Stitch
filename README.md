# TrackMe – a checkin app based on MongoDB Stitch

*Monday, 31 July 2017*
**Not for production**

Refer to [Building a checkin app with MongoDB Stitch](https://www.mongodb.com/blog/post/building-a-checking-app-with-MongoDB-Stitch) for a more complete description of this app (together with instructions for configuring MongoDB Stitch to act as the backend).

## ReactJS client for FourSqaure and other checkin data

A React based web tool to allow users to log in through Google or Facebook, view their own and their friends' checkin data, and send there latest checkin as a text message (via Twilio).

## Usage – development/debugging

To make use of this client, the *trackme* application backend must be running on [MongoDB Stitch](https://www.mongodb.com/cloud/stitch "Backend as a Service for MongoDB") – see [Building a checkin app with MongoDB Stitch](https://www.mongodb.com/blog/post/building-a-checking-app-with-MongoDB-Stitch) for details.


```bash
git clone https://github.com/am-MongoDB/trackme_MongoDB_Stitch.git
cd MongoDB-Mongopop-ReactJS
npm install
export PORT=8008 # Any port that isn't being used by Mongopop or other local server
npm start
```

## Build for 'production'

```bash
npm run build
```

And then copy the contents of the `build` directory to somewhere rootable on your 'production' web server.

Browse to `http://localhost:3000/react` (or to the IP address or hostname specified in `public/app/app.component.ts`).

## Usage (in 'production' mode)

Run [Mongopop](https://github.com/am-MongoDB/Mongopop "Tool to add bulk data to MongoDB as well as sample it, count documents, and apply bulk changes") and browse to `http://localhost:3000/react`