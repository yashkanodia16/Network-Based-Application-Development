// connection object
module.exports = class Connection {

	constructor(connid, connname, conntopic, detail, location, connhost, date, timeFrom, timeTo, connFixtures) {
		this._connid = connid;
		this._connname = connname;
		this._conntopic = conntopic;
		this._detail = detail;
		this._location = location;
		this._connhost = connhost;
		this._date = date;
		this._timeFrom = timeFrom;
		this._timeTo = timeTo;
		this._connFixtures = connFixtures;
	}


	getconnid() {
		return this._connid;
	}

	setconnid(value) {
		this._connid = value;
	}

	getconnname() {
		return this._connname;
	}

	setconnname(value) {
		this._connname = value;
	}

	getconntopic() {
		return this._topic;
	}

	setconntopic(value) {
		this._conntopic = value;
	}

	getdetail() {
		return this._detail;
	}

	setdetail(value) {
		this._detail = value;
	}

	getlocation() {
		return this._location;
	}

	setlocation(value) {
		this._location = value;
	}

	getconnhost() {
		return this._connhost;
	}

	setconnhost(value) {
		this._connhost = value;
	}


	getdate() {
		return this._date;
	}

	setdate(value) {
		this._date = value;
	}

	gettimeFrom() {
		return this._timeFrom;
	}

	settimeFrom(value) {
		this._timeFrom = value;
	}

	gettimeTo() {
		return this._timeTo;
	}

	settimeTo(value) {
		this._timeTo = value;
	}

	getconnFixtures() {
		return this._connFixtures;
	}

	setconnFixtures(value) {
		this._connFixtures = value;
	}

}



