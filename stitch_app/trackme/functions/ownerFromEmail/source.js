exports = function(email){
  
    var atlas = context.services.get("mongodb-atlas");
    var usersColl = atlas.db("trackme").collection("users");
    var owner_id = usersColl.findOne({"userData.email": email}, {_id:0, owner_id:1});
    return owner_id;
};