var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
const UserProfile = require('../models/UserProfile');
const User = require('../models/user');
var ConnectionDB = require('../utility/connectionsDB');
var userDB = require('../utility/UserDB');
var Connection = require('../models/connection');


var router = express.Router();

let error = new Array(1);

//Login
router.get('/login', function(req, res, next) {
	if (req.session.UserSession) {
		res.redirect('/myconnections');
	} else {
		res.render('login');
	}
});

router.post('/login', function(req, res, next) {
	if (req.session.UserSession) {
		res.redirect('/myconnections');
	} else {
		var userdata = userDB.getUser();
		var user = new User(userdata.uId, userdata.fName, userdata.lName, userdata.email, userdata.address, userdata.ucity, userdata.ustate, userdata.uzip, userdata.ucountry);
		req.session.UserSession = user;
		req.session.user_Profile = new UserProfile(user, []);
		res.redirect('/myconnections');
	}
});


router.get('/', function(req, res, next) {
	res.render('index', {
		UserSession: req.session.UserSession
	});
});



//Connection Page
router.get('/connection/:id', function(req, res, next) {
	
	var id = req.params.id;
	var connection;
	if (validateId(id)) {
		try {
			connection = new ConnectionDB().getConnection(id);
			connection = new Connection(connection.connid, connection.connname, connection.conntopic, connection.details, connection.location, connection.connhost, connection.date, connection.timeFrom, connection.timeTo, connection.connFixtures);

			var data = {
				"connection": connection,
				"UserSession": req.session.UserSession

			};
			res.render('connection', {
				data: data,
				UserSession: data.UserSession
			});

		} catch (e) {
			error.push(404);
			res.redirect('/connections');
		}
	} else {
		error.push(400);
		res.redirect('/connections');
	}

});

//Connections Page
router.get('/connections', function(req, res, next) {
	var connections = [];
	var status = null;
	var topics = new ConnectionDB().getTopic();

	new ConnectionDB().getConnections().forEach(connection => {
		connections.push(new Connection(connection.connid, connection.connname, connection.conntopic, connection.details, connection.location, connection.connhost, connection.date, connection.timeFrom, connection.timeTo, connection.connFixtures));
	});
	if (error.length > 0) {
		status = error.pop();
	}


	var data = {
		"topics": topics,
		"connections": connections,
		"UserSession": req.session.UserSession
	};

	res.render('connections', {
		data: data,
		UserSession: data.UserSession
	});
});

//RSVP Connections
router.get('/myconnections/rsvp', function(req, res, next) {
	var rsvp_id = req.query.id;
	if (req.query.rsvp.toUpperCase() == "YES" || req.query.rsvp.toUpperCase() == "NO" || req.query.rsvp.toUpperCase() == "MAYBE") {
		var rsvp = req.query.rsvp;
	}
	if (req.session.UserSession) {
		try {
			var user_Profile = new UserProfile(req.session.user_Profile.user, req.session.user_Profile.userConnections);
			var connection = new ConnectionDB().getConnection(rsvp_id);
			var connection = new Connection(connection.connid, connection.connname, connection.conntopic, connection.details, connection.location, connection.connhost, connection.date, connection.timeFrom, connection.timeTo, connection.connFixtures);
			
			user_Profile.addConnection(connection, rsvp);
			
			req.session.user_Profile = user_Profile;

			res.render('savedConnections', {
				UserSession: req.session.user_Profile.user,
				userConnections: req.session.user_Profile.userConnections
			});
		} catch (e) {
			error.push(404)
			res.redirect('/connections')
		}
	} else {
		res.redirect('/login');
	}
});


//User Specific Connections
router.get('/myconnections', function(req, res, next) {
	
	if (req.session.UserSession) {
		let data = {
			"user_Profile": req.session.user_Profile,
		};
		res.render('savedConnections', {
			UserSession: data.user_Profile.user,
			userConnections: data.user_Profile.userConnections
		});
	} else {
		res.redirect('/login')
	}
});


//Remove Connections
router.get('/myconnections/delete', function(req, res, next) {
	var code = req.query.connectionId;
	if (req.session.UserSession) {
		try {
			var user_Profile = new UserProfile(req.session.user_Profile.user, req.session.user_Profile.userConnections);
			var connection = new ConnectionDB().getConnection(code);
			var connection = new Connection(connection.connid, connection.connname, connection.conntopic, connection.details, connection.location, connection.connhost, connection.date, connection.timeFrom, connection.timeTo, connection.connFixtures);
			user_Profile.removeConnection(connection);
			req.session.user_Profile = user_Profile;
			res.render('savedConnections', {
				UserSession: req.session.user_Profile.user,
				userConnections: req.session.user_Profile.userConnections
			});

		} catch (e) {
			error.push(404)
			res.redirect('/connections')
		}

	} else {
		res.redirect('/login')
	}
});

// Sign Out

router.get('/signout', function(req, res, next) {
	req.session.destroy();
	res.render('index', {
		UserSession: undefined
	});
})

//New Connection

router.get('/newConnection', function(req, res, next) {
	if (req.session.UserSession) {
		res.render('newConnection', {
			UserSession: req.session.UserSession
		});
	}
	else{
	res.render('newConnection')
	}
});

//Static Pages

router.get('/contact', function(req, res, next) {
	if (!req.session.UserSession) {
		res.render('contact')
	}else{
	res.render('contact', {
		UserSession: req.session.user_Profile.user
	});
}
});

router.get('/about', function(req, res, next) {
	if (!req.session.UserSession) {
		res.render('about')
	}else{
	res.render('about', {
		UserSession: req.session.user_Profile.user
	});
}
});

router.get('/*', function(req, res, next) {
	if (!req.session.UserSession) {
		res.render('Error')
	}else{
	res.render('Error', {
		UserSession: req.session.user_Profile.user
	});
}
});

//Connection Page Handling
function validateId(id) {
	if (id !== undefined) {
		if (Number.isInteger(Number.parseInt(id))) {
			return true;
		} else {
			return false;
		}
	}
}


module.exports = router;
