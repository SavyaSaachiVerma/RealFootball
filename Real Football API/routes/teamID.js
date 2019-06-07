

module.exports = function (router){
	var teamModel = require('../models/TeamSchema.js');
    var teamRoute = router.route('/teams/:teamID');

    teamRoute.get( function(req, res){
    	var id = req.params.teamID;
    	console.log(typeof id);
    	teamModel.findOne({team_id: id}, function(err, team) {
    		if(err){
    			res.status(404).send({message: "Team with the provided ID can not be found", user: ""});
    		}
    		else{
    			res.status(200).send({message: "OK", data: team});  
    		}
  		});
    });

    return router;
}