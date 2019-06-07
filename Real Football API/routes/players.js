var secrets = require('../config/secrets');

module.exports = function (router) {

  var route = router.route('/players');
  var playerModel = require('../models/PlayerSchema.js');

  route.get((req, res) => {
    	var query = playerModel.find();  
      // console.log(req.query);

      if(req.query.name) {
        var name = req.query.name;
        console.log(name);
        playerModel.find({name: new RegExp(name, "i")}, (err, players) => {
          console.log(players);
          res.status(200).send({message: "Players found", data: players});
        }); 
      }
      else {

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

      var playerlist = [];
    query.exec((err, players)=> {
            if(err){
              res.status(404).send({message:err, data:[]});
            }
            else {
              if(req.query.count === "true"){
                  res.status(200).send({message: "OK", data: players});
              }
              else{
                 players.forEach( (player) => {
                      playerlist.push(player);
                 });
                 res.status(200).send({message: "OK", data: playerlist}); 
              }
            }
    });

      }


   		
  });

  	route.post((req, res) => {
	  	var name = req.body.name;
		var dateOfBirth = req.body.dateOfBirth;
		var club = req.body.club;
	    var nationality = req.body.nationality;
	    var position = req.body.position;
	    var shirtNumber = req.body.shirtNumber;
      var image = req.body.image;
		playerModel.create({
			name : name,
			dateOfBirth : dateOfBirth,
			club : club,
    		nationality : nationality,
    		position : position,
    		shirtNumber : shirtNumber,
        image: image
		}, (err, result) => {
			if(err){
    			res.status(404).send({
    				message: "Name cannot be empty",
    				data: []
    			});
    		}
    	else{
    			playerModel.findOne({name: name}, (err, player) =>{
    				  var id = player._id;
					  res.status(201).send({message: "Player Created", data: player});  
	  				  
				});
    		}
		});
    });

    return router;
}