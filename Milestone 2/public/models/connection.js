
module.exports = class connection {
    constructor(connId, connFixtures, connName, connTopic, details, date_time) {
        this.connId = connId;
        this.connFixtures = connFixtures;
        this.connName = connName;
        this.connTopic = connTopic;
        this.details = details;
        this.date_time = date_time;
    }

get connName() {
    return this.connName;
}
get connId() {
    return this.connId;
}

  
get connTopic() {
    return this.connTopic;
}
get details() {
    return this.details;
}
get date_time() {
    return this.date_time;
}

set connName(value) {
    this.connName = value;
}
set connId(value){
    this.connId = value;
}
set connTopic(value) {
    this.connTopic = value;
}
  set details(value) {
    this.details = value;
  }
  set date_time(value) {
    this.date_time = value;
  }
 
 
}