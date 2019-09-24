var express = require('express')
var JWT=require('jsonwebtoken') 

var app = express()

// http://localhost:3000/login?username=wqf
app.get('/login', function (req, res, next) {

    const { username } = req.query;
    const user={username};
    const token=JWT.sign(user,'12345678')

    // 下面是解析token的过程
    const tokenDecoded=token.split('.')
    console.log(new Buffer(`${tokenDecoded[0]}=`,'base64').toString()); // {"alg":"HS256","typ":"JWT"}
    console.log(new Buffer(`${tokenDecoded[1]}=`,'base64').toString()); // {"username":"wqf","iat":1569044511} iat为创建时间
    console.log(tokenDecoded[2]); // 第三部分类似于session的sign，是一个加密用的密钥

    res.end(token);
});

// http://localhost:3000/hello
app.get('/hello',function(req, res, next){

    const auth=req.get('Authorization');// 设置req.Authorization需在postman中进行
    if(!auth||auth.indexOf('Bearer ')===-1) res.end('no auth');
    const token=auth.split('Bearer ')[1];
    console.log(`token:${token}`);
    const user=JWT.verify(token,'12345678'); 
    console.log(`user:${user}`);

    res.end(user.toString())
})

app.listen(3000)
