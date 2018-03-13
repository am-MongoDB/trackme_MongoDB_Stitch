exports = function(email) {

    var atlas = context.services.get("mongodb-atlas");
    var coll = atlas.db("trackme").collection("users");
  
    var friend = coll.findOne({owner_id: context.user.id, friends: email});
    if (friend) {
      return true;
    } else {
      return false;
    }
};