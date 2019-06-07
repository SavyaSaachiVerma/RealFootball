

module.exports = function (router){
	var leagueModel = require('../models/LeagueSchema.js');
    var leagueRoute = router.route('/leagues/:leagueId');

    leagueRoute.get( function(req, res){
    	var id = req.params.leagueId;
    	console.log(id);
    	leagueModel.findOne({id: id}, function(err, league) {
    		if(err){
    			res.json({message: "League not found", data: ""});
    		}
    		else{
    			res.json({message: "OK", data: league});  
    		}
  		});
    });

    return router;
}