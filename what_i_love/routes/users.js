// public
var express = require('express');
var router = express.Router();

// mvc基本流程
/*
// 输入:localhost:3000/users?firstname=sun&&lastname=wukong&&age=500
const User=require('../models/in_memo/user');

router.get('/',(req,res)=>{
  const u=new User(req.query.firstname,req.query.lastname,req.query.age);
  console.log(u);
  res.locals.user=u;
  res.render('user');
});
*/



// service的作用
/*
先post:localhost:3000/users
body为
{
  "firstname":"ne",
  "lastname":"zha",
  "age":1000
}
再get:localhost:3000/users/1
*/
/*
const UserServices=require('../services/user_service');

router.get('/',(req,res)=>{
  const users=UserServices.getAllUsers();
  res.locals.users=users;
  res.render('users');
});

router.post('/',(req,res)=>{
  const {firstname,lastname,age}=req.body
  const u=UserServices.addNewUser(firstname,lastname,age)
  res.json(u);
});

router.get('/:userId',(req,res)=>{
  const user=UserServices.getUserById(Number(req.params.userId));
  res.locals.user=user;
  res.render('user');
});
*/



// 用户订阅信息
/*
1. post:localhost:3000/users
body为
{
  "firstname":"ne",
  "lastname":"zha",
  "age":1000
}
2. post:localhost:3000/users/1/subscription
params设置userId:1,
url用body的urlencoded指定，设为'https://google.com"
*/

const UserServices=require('../services/user_service');
router.post('/',(req,res)=>{
  const {firstname,lastname,age}=req.body
  const u=UserServices.addNewUser(firstname,lastname,age)
  res.json(u);
});

router.post('/:userId/subscription',(req,res,next)=>{
  try {
    const subscription=UserServices.CreateSubscription(Number(req.params.userId),req.body.url);
    res.json(subscription);
  } catch(e){
    next(e);
  }
});


// public
module.exports = router;