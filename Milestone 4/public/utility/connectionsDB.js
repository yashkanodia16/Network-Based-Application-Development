let connectDb = require("../models/connection");

var mongoose = require("mongoose");

var connectSchema = new mongoose.Schema({
    uId:String,
    connid : Number,
    connname : String,
    conntopic : String,
    detail : String,
    location : String,
    connhost : String,
    date : String,
    timeFrom : String,
    timeTo : String,
    connFixtures : String,
});

let connectionModel = mongoose.model('connection',connectSchema);

addConnection = async function(uId, conObj){
    return new Promise((resolve, reject)=>{
        new connectionModel({uId:uId, connid:conObj._connid, connname:conObj._connname, conntopic:conObj._conntopic, detail:conObj._detail, location:conObj._location, connhost:conObj._connhost, date:conObj._date, timeFrom:conObj._timeFrom, timeTo:conObj._timeTo, connFixtures:conObj._connFixtures})
        .save(function(err, data){
            if(err){
                console.log(err)
                reject('reject');
            } else{
                console.log(data);
                resolve(data);
            }
        })
    })
}


getConnections= async function() {
    return new Promise(async (resolve, reject) => {
        connectionModel.find()
        .then(function(data) {
            let connections = [];
            data.forEach((connection)=>{
                let connectObj = new connectDb(connection.connid, connection.connname, connection.conntopic, connection.detail, connection.location, connection.connhost, connection.date, connection.timeFrom, connection.timeTo, connection.connFixtures);
                connections.push(connectObj);
            })
            resolve(connections)
        })
        .catch(err => {
            return reject(err);
        });
    });
}

getConnection= async function(connid) {
    return new Promise((resolve, reject) => {
        connectionModel.find({connid:connid})
        .then(data => {
                let connectObj = new connectDb(data[0].connid, data[0].connname, data[0].conntopic, data[0].detail, data[0].location, data[0].connhost, data[0].date, data[0].timeFrom, data[0].timeTo, data[0].connFixtures);
                resolve(connectObj)
        })
        .catch(err => {
            return reject(err);
        });
    });
}

getTopic = function(getconnection) {
    var topics = new Array();
    getconnection.forEach(connection => {
        if (!topics.includes(connection._conntopic)) {
            topics.push(connection._conntopic);
        }
    }); 
    

    if (topics !== undefined) {
        return topics;
    }
}

LastConnection = async function(){
    return new Promise((resolve, reject) => {
      connectionModel
        .find({},{connid:1})
          .sort({connid:-1})
            .limit(1)
              .then(data => {
   
                resolve(data);
                        })
          .catch(err => {
            return reject(err);
        });
    })
  }


module.exports = {getConnections,getConnection,getTopic,addConnection,LastConnection};


  