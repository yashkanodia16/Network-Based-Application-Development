var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
const UserProfile = require('../models/UserProfile');
const User = require('../models/user');
var ConnectionDB = require('../utility/connectionsDB');
var userDB = require('../utility/UserDB');
var Connection = require('../models/connection');
var profileDb = require('../utility/UserProfile');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});
var UserConnection = require('../models/userConnection');
// var {getConnection,getConnections,getTopic} = require('../utility/connectionsDB');


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

router.post('/login', urlencodedParser , async function(req, res, next) {
	if (req.session.UserSession) {
		res.redirect('/myconnections');
	} else {
		//var userdata =await userDB.getUser(req.body.username);
		var user = await userDB.getUser();
		//var user = new User(userdata.uId, userdata.fName, userdata.lName, userdata.email, userdata.address, userdata.ucity, userdata.ustate, userdata.uzip, userdata.ucountry);
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
router.get('/connection/:id', async function(req, res, next) {
	
	var id = req.params.id;
	var connection;
	if (validateId(id)) {
		try {
			connection = await ConnectionDB.getConnection(id);

			var data = {
				"connection": connection,
				"UserSession": req.session.UserSession

			};
			//console.log(data);
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
router.get('/connections', async function(req, res, next) {
	try{
		var status = null;
		// var abcd = await ConnectionDB.addConnection(req.session.UserSession.uId,conObj);
		let list = await ConnectionDB.getConnections();
		var topics = ConnectionDB.getTopic(list);
		
		// console.log('List:',list,'Topics:',topics);

		if (error.length > 0) {
			status = error.pop();
		}
	
	
		var data = {
			"topics": topics,
			"connections": list,
			"UserSession": req.session.UserSession
		};
	
		res.render('connections', {
			data: data,
			UserSession: data.UserSession
		});
	}catch(err){
		console.log(err);
	}

});

//RSVP Connections
router.post('/myconnections',urlencodedParser,async function(req, res, next) {
	var rsvp_id = req.body.id;
	if (req.body.rsvp == "yes" || req.body.rsvp == "no" || req.body.rsvp == "maybe") {
		var rsvp = req.body.rsvp;
	}
	if (req.session.UserSession) {
		try {
			var getConnect = await profileDb.getProfile(req.session.UserSession._uId);
			console.log('userProfile:', getConnect)
			if(getConnect.length!=0){
				let check = await profileDb.addConnection(req.session.UserSession._uId,rsvp_id,rsvp);
				console.log('Check logic',check)
				if(check.nModified == 0){
					await profileDb.updateConnection(req.session.UserSession._uId,rsvp_id,rsvp);
				}
			}
				else {
					await profileDb.createConnection(req.session.UserSession._uId,rsvp_id,rsvp);
				}
		
			res.redirect('myconnections');
		} catch (e) {
			error.push(404)
			res.redirect('/connections')
		}
	} else {
		res.redirect('/login');
	}
});


//User Specific Connections
router.get('/myconnections',async function(req, res, next) {
	
	if (req.session.UserSession) {
		var connect = await profileDb.getProfile(req.session.UserSession._uId);
		let list = [];
		if(connect.length>0){
			for(let i=0;i<connect[0].userConnections.length;i++){
				let connect1 = await ConnectionDB.getConnection(connect[0].userConnections[i].connectionId);
				list.push(new UserConnection(connect1,connect[0].userConnections[i].rsvp));
			}
		} 
		console.log('List of Connections:',list);
			let data = {
			"user_Profile": list,
			};
			res.render('savedConnections', {
				UserSession: req.session.UserSession,
				userConnections: data.user_Profile
			});
		
	} else {
		res.redirect('/login')
	}
});


//Remove Connections
router.get('/myconnectionsdelete', async function(req, res, next) {
	var code = req.query.connectionId;
	if (req.session.UserSession) {
		try {
			await profileDb.removeConnection(req.session.UserSession._uId,code);
			res.redirect('myconnections');
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

router.post('/newConnection',urlencodedParser,async function(req,res){
	if(req.session.UserSession){
		console.log(req.body);
		var lastid= await ConnectionDB.LastConnection();
		var newid=lastid[0].connid+1;
		console.log("session in newconn: ",req.session.UserSession);
		var insertConnect = new Connection(newid, req.body.name,req.body.topic,req.body.details,req.body.where,req.session.UserSession._fName,req.body.when,req.body.timefrom,req.body.timeto,req.body.fixtures);
		console.log("hahha",insertConnect);
		await ConnectionDB.addConnection(req.session.UserSession._uId,insertConnect);
		var getConnect = await profileDb.getProfile(req.session.UserSession._uId);
		if(getConnect.length>0){
			await profileDb.addConnection(req.session.UserSession._uId,newid,'yes');
		} else{
			await profileDb.createConnection(req.session.UserSession._uId,newid,'yes');
		}
		res.redirect('/myconnections');
	}
	else{
		res.render('login');
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
