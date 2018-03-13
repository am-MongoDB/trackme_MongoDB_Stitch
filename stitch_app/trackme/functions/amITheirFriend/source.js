exports = function(user_id){

  // Check whether the email address of the current user is in the friends list of the user passed in
  var atlas = context.services.get("mongodb-atlas");
  var usersColl = atlas.db("trackme").collection("users");
  var myEmail = usersColl.findOne({owner_id: context.user.id}).userData.email;
  var myFriend = usersColl.findOne({owner_id: user_id, friends: myEmail});
  
  if (myFriend) {
    return true;
  } else {
    return false;
  }
};