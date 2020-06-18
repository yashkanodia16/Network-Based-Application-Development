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


	get connid() {
		return this._connid;
	}

	set connid(value) {
		this._connid = value;
	}

	get connname() {
		return this._connname;
	}

	set connname(value) {
		this._connname = value;
	}

	get conntopic() {
		return this._topic;
	}

	set conntopic(value) {
		this._conntopic = value;
	}

	get detail() {
		return this._detail;
	}

	set detail(value) {
		this._detail = value;
	}

	get location() {
		return this._location;
	}

	set location(value) {
		this._location = value;
	}

	get connhost() {
		return this._connhost;
	}

	set connhost(value) {
		this._connhost = value;
	}


	get date() {
		return this._date;
	}

	set date(value) {
		this._date = value;
	}

	get timeFrom() {
		return this._timeFrom;
	}

	set timeFrom(value) {
		this._timeFrom = value;
	}

	get timeTo() {
		return this._timeTo;
	}

	set timeTo(value) {
		this._timeTo = value;
	}

	get connFixtures() {
		return this._image;
	}

	set connFixtures(value) {
		this._connFixtures = value;
	}

}



