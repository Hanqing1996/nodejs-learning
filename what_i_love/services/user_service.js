const User=require('../models/in_memo/user');

module.exports.getAllUsers=function(){
    return User.list();
};

module.exports.addNewUser=function(firstname,lastname,age){
    return User.insert(firstname,lastname,age);
};

module.exports.getUserById=function(userId){
    return User.getOneById(userId);
};