var exports = function(payload) {
  /*
    Try running this in the console below:
    exports({query: {arg: 'hello'}, body: BSON.Binary.fromText('{"msg": "world"}')})
  */
  var body = {};
  if (payload.body) {
    console.log("Payload body: " + payload.body.text());
    body = EJSON.parse(payload.body.text());
    console.log("Body: " + body);
  }
  
  var owner_id = context.functions.execute("ownerFromEmail", body.email);
  var checkin = {
    owner_id: owner_id.owner_id,
    email: body.email,
    venueName: body.venue,
    date: body.date,
    url: body.url,
    locationImg: body.location
  };
  
  context.functions.execute("checkin", checkin);
};