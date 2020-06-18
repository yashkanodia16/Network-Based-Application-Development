module.exports = class User {

	constructor(uId, fName, lName, email, address, ucity, ustate, uzip, ucountry) {
		this._uId = uId;
		this._fName = fName;
		this._lName = lName;
		this._email = email;
		this._address = address;
		this._ucity = ucity;
		this._ustate = ustate;
		this._uzip = uzip;
		this._ucountry = ucountry;
	}

	get uId() {
		return this._uId;
	}

	set uId(value) {
		this._uId = value;
	}

	get fName() {
		return this._fName;
	}

	set fName(value) {
		this._fName = value;
	}

	get lName() {
		return this._lName;
	}

	set lName(value) {
		this._lName = value;
	}

	get email() {
		return this._email;
	}

	set email(value) {
		this._email = value;
	}

	get address() {
		return this._address;
	}

	set address(value) {
		this._address = value;
	}

	get ucity() {
		return this._ucity;
	}

	set ucity(value) {
		this._ucity = value;
	}

	get ustate() {
		return this._ustate;
	}

	set ustate(value) {
		this._ustate = value;
	}

	get uzip() {
		return this._uzip;
	}

	set uzip(value) {
		this._uzip = value;
	}

	get ucountry() {
		return this._ucountry;
	}

	set ucountry(value) {
		this._ucountry = value;
	}
}


