var secrets = require('../config/secrets');

module.exports = function (router) {

  var route = router.route('/users');
  var userModel = require('../models/UserSchema.js');

  route.get((req, res) => {
    	var query = userModel.find();  
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

      var userlist = [];
    query.exec((err, users)=> {
            if(err){
              res.status(404).send({message:err, data:[]});
            }
            else {
              if(req.query.count === "true"){
                  res.status(200).send({message: "OK", data: users});
              }
              else{
                 users.forEach( (user) => {
                      userlist.push(user);
                 });
                 res.status(200).send({message: "OK", data: userlist}); 
              }
            }
    });
   		
  });

  	route.post((req, res) => {
      var userID = req.body.userID;
	  	var name = req.body.name;
      var picture = req.body.picture;
      var email = req.body.email;

		userModel.create({
      userID: userID,
			name : name,
      picture: picture,
      email: email
		}, (err, result) => {
			if(err){
    			res.status(404).send({
    				message: "userID cannot be empty",
    				data: []
    			});
    		}
    	else{
    			userModel.findOne({userID: userID}, (err, user) =>{
					  res.status(201).send({message: "User Created", data: user});  
	  				  
				});
    		}
		});
    });

    return router;
}