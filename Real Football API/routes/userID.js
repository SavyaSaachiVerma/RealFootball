

module.exports = function (router){
	var userModel = require('../models/UserSchema.js');
    var userRoute = router.route('/users/:userID');

    userRoute.get( function(req, res){
    	var userID = req.params.userID;
    	userModel.findOne({userID: userID}, function(err, user) {
    		if(err || user === null){
    			res.status(404).send({message: "User with the provided ID can not be found", user: null});
    		}
    		else{
    			res.status(200).send({message: "OK", data: user});  
    		}
  		});
    });

    userRoute.put( function(req,res){

        userModel.findOneAndUpdate({userID: req.params.userID}, req.body, {new: true}, (err, user) => {
            if(err) {
                res.status(404).send({
                    message: "Failed",
                    data: []
                });
            }
            else {
                res.status(200).send({
                    message: "Update Successful",
                    data: user
                });
            }
        }) 

    });
    // 	if (name == undefined || email == undefined){
    // 		res.status(404).send({message: " Name and Email are required fields."})
    // 	}
    // 	else if( pendingTasks == undefined ){
    //     	var userToAdd = new userModel({_id: id, name: name, email: email});
    // 		userModel.findOneAndUpdate({_id: id}, userToAdd, function(err,user){
    // 			if(err){
				// 	res.status(404).send({
    // 					message: "User Not Found",
    // 					data: [],
    // 				});
    // 			}
   	// 			else{
   	// 				userModel.findOne({email: email}, function(err, user) {
			 //   			res.status(200).send({
			 //   				message: "OK", 
			 //   				user: user});  
  		// 			});
   	// 			}
    // 		});
    // 	}
    // 	else{ 
    // 		var userToAdd = new userModel({_id: id, name: name, email: email, pendingTasks: pendingTasks});
    // 		userModel.findOneAndUpdate({_id: id}, userToAdd, function(err, user){
    // 			if(err){
    // 				res.status(404).send({
    // 						message: "User Not Found",
    // 						data: [],
    // 					});
    // 			}
   	// 			else{
   	// 				userModel.findOne({email: email}, function(err, user) {
			 //   			res.status(200).send({
			 //   				message: "OK",
			 //   				user: user});  
  		// 			});
   	// 			}
    // 		});
    // 	}
    // });

    // userRoute.delete(function(req,res){
    // 	var id = req.params.userId;
    // 	userModel.deleteOne({_id:id}, function(err, user){
    // 		if(err){
    // 			res.status(404).send({
   	// 				message: "User Not Found",
    // 				data: [],
    // 			});
    // 		}
    // 		else{
    // 			res.status(200).send({
    // 				message: "User was deleted",
    // 				user: [],
    // 			})
    // 		}
    // 	});
    // });

    return router;
}