let profileDB = require("../models/userProfile"); 

var mongoose = require("mongoose");
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var profileSchema = new mongoose.Schema({
    uId : String,
    userConnections : [
        {
            connectionId:Number,
            rsvp:String
        }
    ]
});

profileModel = mongoose.model('userconnections',profileSchema);

getProfile = function(uId){
    return new Promise((resolve, reject) => {
        profileModel.find({uId : uId})
        .then(data => {
            console.log(data);
            resolve(data)
        })
        .catch(err => {
            return reject(err);
        });
    });
}

createConnection = async function(uId,connectionId,rsvp){
    return new Promise((resolve, reject) => {
        console.log('createConnection:',uId,connectionId,rsvp)
        new profileModel({uId:uId,userConnections:[{connectionId:connectionId,rsvp:rsvp}]})
        .save(function(err, data){
            if(err){
                console.log(err)
                reject('reject');
            } else{
                console.log(data);
                resolve(data);  
            }
        })
    });
}

addConnection = async function(uId,connectionId,rsvp){
    console.log('addConnection:',uId,connectionId,rsvp)
    return new Promise((resolve, reject) => {
        profileModel.updateOne({uId : uId, "userConnections.connectionId":{$ne: connectionId}},
            {$push:{userConnections:{connectionId:connectionId, rsvp: rsvp}}}, function(err,data){
                if(err){
                    console.error(err);
                    reject('reject');
                  } else{
                    resolve(data);
                  }
            })
    })
}

updateConnection = async function(uId,connectionId,rsvp){
    return new Promise((resolve, reject) => {
        profileModel.updateOne({uId : uId, "userConnections.connectionId":connectionId},
            {$set:{"userConnections.$.rsvp": rsvp}},
            function(err,data){
                if(err){
                    console.error(err);
                    reject('reject');
                  } else{
                    resolve(data);
                  }
            })
    })
}

removeConnection = async function(uId,connectionId){
    return new Promise((resolve, reject) => {
        profileModel.updateOne({uId : uId},
            {$pull:{userConnections:{connectionId:connectionId}}},
            function(err,data){
                if(err){
                    console.error(err);
                    reject('reject');
                  } else{
                    resolve(data);
                  }
            })
    })
}





module.exports = {getProfile,createConnection,updateConnection,removeConnection,addConnection};