// 用户订阅，需要用到User和Subscription两个Model
const User=require('../models/in_memo/user');
const Subscription=require("../models/in_memo/subscription");

class UserServices{

    static getAllUsers=function(){
        return User.list();
    };

    static addNewUser=function(firstname,lastname,age){
        return User.insert(firstname,lastname,age);
    };

    static getUserById=function(userId){
        return User.getOneById(userId);
    };

    static CreateSubscription(userId,url){
        const user=User.getOneById(userId);

        // 判断有无该id的user
        if(!user) throw Error('No such user!');
        const sub=Subscription.insert(userId,url);
        return sub;
    };
}



module.exports=UserServices;