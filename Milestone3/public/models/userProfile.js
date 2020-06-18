
var User = require('./user');
var UserConnection = require('./userConnection');
var Connection = require('./connection');

class UserProfile {
	constructor(user, userConnections) {
		this.user = user;
		this.userConnections = userConnections;
	}

	//Add Function
	addConnection(connection, rsvp) {
		var flag = 0;
		if (connection instanceof Connection && rsvp != undefined) {
			for (let i = 0; i < this.userConnections.length; i++) {

				if (this.userConnections[i]._connection._connid === connection.connid) {
					this.userConnections[i]._rsvp = rsvp;
					flag = 1;
					break;
				}
			}
			if (flag == 0) {
				let newUserCon = new UserConnection(connection, rsvp);
	
				this.userConnections.push(newUserCon);
			}
		} else {
			throw new Error('Not Connection Object');
		}
	}

	//Remove Function
	removeConnection(connection) {
	
		if (connection instanceof Connection) {
			for (let i = 0; i < this.userConnections.length; i++) {
				if (this.userConnections[i]._connection._connname === connection.connname) {
					
					this.userConnections.splice(i, 1);
					break;
				}
			}
		} else {
			throw new Error('Not Connection Object');
		}
	}

	getUserConnections() {
		return this.userConnections;
	}

	emptyProfile() {
		delete this.user;
		this.userConnections = new Array();
	}

}


module.exports = UserProfile;

