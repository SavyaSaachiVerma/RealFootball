var secrets = require('../config/secrets');

module.exports = function (router) {

  var route = router.route('/teams');
  var teamModel = require('../models/TeamSchema.js');

  route.get((req, res) => {
    	var query = teamModel.find();  

      if(req.query.name) {
        var name = req.query.name;
        console.log(name);
        teamModel.find({name: new RegExp(name, "i")}, (err, teams) => {
          console.log(teams);
          res.status(200).send({message: "Teams found", data: teams});
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
        var teamlist = [];
    query.exec((err, team)=> {
            if(err){
              res.status(404).send({message:err, data:[]});
            }
            else {
              if(req.query.count === "true"){
                  res.status(200).send({message: "OK", data: team});
              }
              else{
                 team.forEach( (team) => {
                      teamlist.push(team);
                 });
                 res.status(200).send({message: "OK", data: teamlist}); 
              }
            }
    });
      }

   		
  });

  route.post((req, res) => {
    var team_id = req.body.team_id;
    var name = req.body.name;
    var code = req.body.code;
    var logo = req.body.logo;
		
		teamModel.create({
      team_id: team_id,
      name: name,
      code: code, 
      logo: logo
		}, (err, result) => {
			if(err){
    			res.status(404).send({
    				message: "team names cannot be empty",
    				data: []
    			});
    		}
    	else{
    			teamModel.findOne({name: name}, (err, team) =>{
					  res.status(201).send({message: "Team Created", data: team});  
	  				  
				});
    		}
		});
    });

    return router;
}