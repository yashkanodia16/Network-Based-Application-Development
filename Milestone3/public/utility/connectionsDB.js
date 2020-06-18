const connections = [{
    "connid": 1,
    "connname": "Real Madrid",
    "conntopic": "La Liga Teams Selection",
    "details": "Please bring your ID card and Entry Fee is 5 USD",
    "location": "Student Union",
    "connhost": "Norm Niner",
    "date": "Thursday, March 21, 2020",
    "timeFrom": "11:00am",
    "timeTo": "12:30pm",
    "connFixtures": "Real Madrid vs Juventus"
},
{
    "connid": 2,
    "connname": "Barcelona",
    "conntopic": "La Liga Teams Selection",
    "details": "Please bring your ID card and Entry Fee is 5 USD",
    "location": "Student Union",
    "connhost": "Norm Niner",
    "date": "Thursday, March 21, 2020",
    "timeFrom": "11:00am",
    "timeTo": "12:30pm",
    "connFixtures": "Barcelona vs Napoli"
},
{
    "connid": 3,
    "connname": "Athletico Madrid",
    "conntopic": "La Liga Teams Selection",
    "details": "Please bring your ID card and Entry Fee is 5 USD",
    "location": "Student Union",
    "connhost": "Norm Niner",
    "date": "Thursday, March 21, 2020",
    "timeFrom": "11:00am",
    "timeTo": "12:30pm",
    "connFixtures": "Athletico Madrid vs Getafe CF"
},
{
    "connid": 4,
    "connname": "Liverpoool",
    "conntopic": "Premier League Teams Selection",
    "details": "Please bring your ID card and Entry Fee is 5 USD",
    "location": "Student Union",
    "connhost": "Norm Niner",
    "date": "Thursday, March 15, 2020",
    "timeFrom": "11:30am",
    "timeTo": "1:00pm",
    "connFixtures": "Liverpool vs Wolves"
},
{
    "connid": 5,
    "connname": "Manchester City",
    "conntopic": "Premier League Teams Selection",
    "details": "Please bring your ID card and Entry Fee is 5 USD",
    "location": "Student Union",
    "connhost": "Norm Niner",
    "date": "Thursday, March 15, 2020",
    "timeFrom": "11:30am",
    "timeTo": "1:00pm",
    "connFixtures": "Manchester City vs Bayern Munich"
},
{
    "connid": 6,
    "connname": "Manchester United",
    "conntopic": "Premier League Teams Selection",
    "details": "Please bring your ID card and Entry Fee is 5 USD",
    "location": "Student Union",
    "connhost": "Norm Niner",
    "date": "Thursday, March 15, 2020",
    "timeFrom": "11:30am",
    "timeTo": "1:00pm",
    "connFixtures": "Manchester United vs PSG"
}
];


class ConnectionDB {

getConnections() {
    return connections;
}

getConnection(connid) {
    if (connid !== undefined) {
        var connection = connections.filter(connection => connection.connid == connid);
        return connection[0];
    } else {
        throw new Error("Invalid Connection ID");
    }
}

getTopic() {
    var topics = new Array();
    connections.forEach(connection => {
        if (!topics.includes(connection.conntopic)) {
            topics.push(connection.conntopic);
        }
    });

    if (topics !== undefined) {
        return topics;
    }
}
}

module.exports = ConnectionDB;


  