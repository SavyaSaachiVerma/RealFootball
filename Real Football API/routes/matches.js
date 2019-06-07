var secrets = require('../config/secrets');

module.exports = function (router) {

  var route = router.route('/matches');
  var matchModel = require('../models/MatchSchema.js');

  route.get((req, res) => {
    	var query = matchModel.find();  

      if(req.query.where) {
        query.where(JSON.parse(req.query.where));
		  }
   		if(req.query.sort){
   			query.sort(JSON.parse(req.query.sort));
   		}
   		if(req.query.select){
   			query.select(JSON.parse(req.query.select));
   		}
   		if(req.query.skip){
   			query.skip(JSON.parse(req.query.skip));
   		}
   		if(req.query.limit){
   			query.limit(JSON.parse(req.query.limit));	
   		}
   		if(req.query.count === "true"){
   			query.count({}, (err, count)=>{
   					if(err){
   						res.status(500).send({message:"Could not process your query due to a Server Error", data: []});
   					}
   				});
   		}

   		var matchlist = [];
		query.exec((err, matches)=> {
	        	if(err){
	        		res.status(404).send({message:err, data:[]});
	        	}
	        	else {
	        		if(req.query.count === "true"){
	        			  res.status(200).send({message: "OK", data: matches});
	        		}
	        		else{
			    		   matches.forEach( (match) => {
			      		   		matchlist.push(match);
			    		   });
			    		   res.status(200).send({message: "OK", data: matchlist}); 
			    	  }
		   		  }
    });
  });

  route.post((req, res) => {
    var fixture_id= req.body.fixture_id
    var leagueName = req.body.leagueName
    var date = req.body.date
    var time= req.body.time
    var score= req.body.score
    var homeTeam= req.body.homeTeam
    var homeID= req.body.homeID
    var awayTeam= req.body.awayTeam
    var awayID= req.body.awayID
	  	
		
		matchModel.create({
			fixture_id: fixture_id,
      leagueName : leagueName,
      date : date,
      time: time,
      score: score,
      homeTeam: homeTeam,
      homeID: homeID,
      awayTeam: awayTeam,
      awayID: awayID,
		}, (err, result) => {
			if(err){
    			res.status(404).send({
    				message: "team names cannot be empty",
    				data: []
    			});
    		}
    	else{
    			matchModel.findOne({leageName: leagueName, homeTeam:homeTeam, awayTeam: awayTeam}, (err, match) =>{
    				  //var id = match._id;
					  res.status(201).send({message: "Match Created", data: match});  
	  				  
				});
    		}
		});
    });

    return router;
}