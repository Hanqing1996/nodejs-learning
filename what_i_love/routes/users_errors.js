var express = require('express');
var router = express.Router();

const UserService=require('../services/user_service_mongoose');
const HTTPReqParamError=require('../errors/http_request_param_error');


// http://localhost:3000/users_errors/123
router.get('/:userId',(req,res)=>{
    (async()=>{

        const {userId}=req.params;
        if(userId.length<5){
            throw new HTTPReqParamError('userId','用户id不能为空','user id can not be empty');
        }
        const user=await UserService.getUserById(userId);
        res.locals.user=user;
        res.render('user');
    })()
        .catch((e)=>{
        console.log(e);
        res.json(e);
    });
  });


  module.exports=router;  
   