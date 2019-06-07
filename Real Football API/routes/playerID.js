

module.exports = function (router){
	var playerModel = require('../models/PlayerSchema.js');
    var playerRoute = router.route('/players/:playerID');

    playerRoute.get( function(req, res){
    	var id = req.params.playerID;
    	console.log(typeof id);
    	playerModel.findOne({_id: id}, function(err, player) {
    		if(err){
    			res.status(404).send({message: "Player with the provided ID can not be found", data: null});
    		}
    		else{
    			res.status(200).send({message: "OK", data: player});  
    		}
  		});
    });

    return router;
}