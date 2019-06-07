var secrets = require('../config/secrets');

module.exports = function (router) {

  var route = router.route('/leagues');
  var leagueModel = require('../models/LeagueSchema.js');

  route.get((req, res) => {
      var query = leagueModel.find();  

      if(req.query.name) {
        var name = req.query.name;
        leagueModel.find({name: new RegExp(name, "i")}, (err, leagues) => {
          console.log(leagues);
          res.status(200).send({message: "Leagues found", data: leagues});
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

      var leaguelist = [];
    query.exec((err, leagues)=> {
            if(err){
              res.status(404).send({message:err, data:[]});
            }
            else {
              if(req.query.count === "true"){
                  res.status(200).send({message: "OK", data: leagues});
              }
              else{
                 leagues.forEach( (league) => {
                      leaguelist.push(league);
                 });
                 res.status(200).send({message: "OK", data: leaguelist}); 
              }
            }
    });

      }


      
  });

    route.post((req, res) => {
      var id = req.body.league_id;
      var name = req.body.name;
      var country = req.body.country;
      var season = req.body.season;
      var season_start = req.body.season_start;
      var season_end = req.body.season_end;
      var flag = req.body.flag;
      var logo = req.body.logo;
      var standings = req.body.standings;

    leagueModel.create({
      id: id,
      name : name,
      country: country,
      season: season,
      seasonStart: season_start,
      seasonEnd: season_end,
      logo: logo, 
      flag: flag,
      standings: standings
    }, (err, result) => {
      if(err){
          res.status(404).send({
            message: "ID cannot be empty",
            data: []
          });
        }
      else{
          leagueModel.findOne({name: name}, (err, league) =>{
              var id = league.id;
            res.status(201).send({message: "League Created", data: league});  
              
        });
        }
    });
    });

    return router;
}