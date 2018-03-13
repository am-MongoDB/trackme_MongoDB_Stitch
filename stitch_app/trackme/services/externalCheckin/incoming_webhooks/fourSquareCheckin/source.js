var exports = function(payload) {
  /*
    Try running this in the console below:
    exports({query: {arg: 'hello'}, body: BSON.Binary.fromText('{"msg": "world"}')})
  */
  var queryArg = payload.query.arg || '';
  var body = {};
  if (payload.body) {
  body = EJSON.parse(payload.body.text());
  }
  
  var owner_id = context.functions.execute("ownerFromEmail", body.email);
  var checkin = {
    owner_id: owner_id.owner_id,
    email: body.email,
    venueName: body.venue,
    date: body.checkinDate,
    url: body.url,
    locationImg: body.location + "&key=" + context.values.get("GoogleMapsStaticKey")
  };
  
  context.functions.execute("checkin", checkin);
};