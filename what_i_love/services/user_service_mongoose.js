

// 用户订阅，需要用到User和Subscription两个Model
const User=require('../models/mongoose/user'); // 调用in_memo的user类 
const Subscription=require("../models/in_memo/subscription");

class UserServices{

    static getAllUsers=async function(){
        const users=await User.list();
        return users;
    };

    static addNewUser=async function(name,age){

        // 在service做校验，判断输入的对象字段是否正确
        const user=await User.insert({
            name,
            age,
        });
        return user;
    };

    static getUserById=async function(userId){

        const user=await User.getOneById(userId);
        return user;
    };

    static CreateSubscription=async function(userId,url){
        const user=await User.getOneById(userId);

        // 判断有无该id的user
        if(!user) throw Error('No such user!');
        const sub=await Subscription.insert({
            userId,
            url,
        });
        return sub;
    };
}



module.exports=UserServices;
