
let userDB = require("../models/user");

var mongoose = require("mongoose");
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var userSchema = new mongoose.Schema({
    uId : String,
    fname : String,
    lname : String,
    email : String,
    address : String,
    ucity : String,
    ustate : String,
    uzip : String,
    ucountry : String,
    password: String,
});

let userModel = mongoose.model('users',userSchema);

getUser= async function(uId) {
    return new Promise((resolve, reject) => {
        userModel.find({})
        .then(data => {

                let userObj = new userDB(data[0].uId, data[0].fname, data[0].lname, data[0].email, data[0].address, data[0].ucity, data[0].ustate, data[0].uzip, data[0].ucountry, data[0].password);
                resolve(userObj)
        })
        .catch(err => {
            return reject(err);
        });
    });
}
module.exports={getUser};