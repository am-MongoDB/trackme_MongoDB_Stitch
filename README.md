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
cd trackme_MongoDB_Stitch
npm install
```

Edit the value of `appId` in `config.js`; replacing `trackme-xxxx` with the value for your Stitch app (find in the *Clients* tab in the [Stitch console](https://stitch.mongodb.com) after creating your MongoDB Stitch app).

```bash
npm start
```