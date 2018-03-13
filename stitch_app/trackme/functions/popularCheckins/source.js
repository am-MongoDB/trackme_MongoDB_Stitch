exports = function(limit){
    var atlas = context.services.get("mongodb-atlas");
    var checkinColl = atlas.db("trackme").collection("checkins");
    var checkins = checkinColl.aggregate([
      {$match: {owner_id: context.user.id}},
	    {$group: {
		    _id: "$venueName",
		    count: {$sum: 1}
	    }},
	    {$sort: {count: -1}},
	    {$limit: limit},
	    {$project: {
	      venue: "$_id",
	      _id: 0,
	      count: 1
	    }}
    ]).toArray();
    return checkins;
};