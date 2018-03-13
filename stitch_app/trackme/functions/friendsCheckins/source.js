exports = function(limit) {

    var atlas = context.services.get("mongodb-atlas");
    var usersColl = atlas.db("trackme").collection("users");
    var checkinsColl = atlas.db("trackme").collection("checkins");
    
    console.log("user id: " + context.user.id);
    
    // Find all of the users for which I'm a friend
    var myEmail = usersColl.findOne({"owner_id": context.user.id})
        .userData.email;
    var friends = usersColl.find({"friends": myEmail}).toArray();
    
    // Build an array of the checkins for each friend
    var friendCheckins = [];
    friends.forEach(function(friend){
      var friendCheckin = {_id: friend.userData.email, checkins: []};
      checkinsColl.find({owner_id: friend.owner_id},
          {_id:0, venueName:1, date:1, url:1, locationImg: 1})
          .sort({_id: -1}).limit(limit).toArray()
          .forEach(function(checkin){
        friendCheckin.checkins.push(checkin);
      });
      friendCheckins.push(friendCheckin);
    });
    
    return friendCheckins;
};