var express = require('express');
var router = express.Router();

const UserService=require('../services/user_service_mongoose');

// 输入:localhost:3000/users_mongoose
router.get('/',(req,res)=>{

    (async()=>{

        const users=await UserService.getAllUsers();
        res.locals.users=users;
        res.render('users_mongoose');
    })().then(r=>{
        console.log(r);
    }).catch(e=>{ 
        console.log(e);
    });

  });

//   输入:localhost:3000/users_mongoose/5d43d7e21e82a1658a5d84af/subscription
router.post('/subscription',(req,res)=>{
    console.log('dsds');

    (async()=>{

        //const subscription=await UserServices.CreateSubscription(req.params.userId,req.body.url);
        const subscription=await UserService.CreateSubscription('5d43d7e21e82a1658a5d84af','https://google.com');
        res.json(subscription);

    })().then(r=>{
        console.log(r);
    }).catch(e=>{
        console.log(e);
    });

});



 module.exports = router;