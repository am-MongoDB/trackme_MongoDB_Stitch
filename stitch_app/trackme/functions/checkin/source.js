exports = function(checkin){
    var atlas = context.services.get("mongodb-atlas");
    var checkinColl = atlas.db("trackme").collection("checkins");
    try {
      checkinColl.insertOne(checkin);
    } catch (e) {
      console.log("Error inserting checkin doc: " + e);
      return e.message();
    }
};