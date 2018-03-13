exports = function(friend) {

    var atlas = context.services.get("mongodb-atlas");
    var coll = atlas.db("trackme").collection("users");
  
    result = coll.updateOne({owner_id: context.user.id}, {"$push": {"friends": friend}}, {"upsert": false});
    return ({success: ((result.matchedCount == 1) ? true : false)});
};
