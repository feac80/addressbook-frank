const User = require("../models/campground")//
//      Comment    = require("../models/comment");

const middlewareObj= {};

middlewareObj.isLoggedIn = function (req, res, next){
	// passport.authenticate("jwt", { session: false }),
  // (req, res) => {
  //   res.json({
  //     id: req.user.id,
  //     name: req.user.name,
  //     email: req.user.email
  //   });
  // } 
	
	// if(req.isAuthenticated()){
  //       return next();
  //   }
  //   req.flash("error", "You need to be logged in to do that");
  //   res.status(500).json({error:"The user is not logged in "});
};