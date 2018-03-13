exports = function(destinationNumber){  
  var atlas = context.services.get("mongodb-atlas");
  var checkinColl = atlas.db("trackme").collection("checkins");
  var checkin = checkinColl.find({"owner_id": context.user.id}).sort({_id: -1}).limit(1).toArray();
  var body = "";
  if (checkin.length > 0) {
    body = "You last checked in at " + checkin[0].venueName + ". " + checkin[0].url;
  } else {
    body = "You have not yet checked in anywhere";
  }
  
  var twilio = context.services.get("myTwilio");
  twilio.send({
    to: destinationNumber,
    from: context.values.get('twilioNumber'),
    body: body
  });
};