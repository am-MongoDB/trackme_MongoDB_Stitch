exports = function(limit){
    var atlas = context.services.get("mongodb-atlas");
    var checkinColl = atlas.db("trackme").collection("checkins");
    var checkins = checkinColl.find({"owner_id": context.user.id}).sort({_id: -1}).limit(limit).toArray();
    return checkins;
};