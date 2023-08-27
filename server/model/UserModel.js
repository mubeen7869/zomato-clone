const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    first_name : {type : String},
    email : {type : String},
    address : {type : String},
    mobile: {type: Number},
    password: {type: String},
});

const UserModel = mongoose.model('user',UserSchema,'user'); //name, schema, collectionName
module.exports = UserModel;