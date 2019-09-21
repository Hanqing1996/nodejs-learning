var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.use(cookieSession({
  name: 'demoSession',
  keys: ['12345678']
}))

// 用户登录,记录用户信息
app.get('/login', function (req, res, next) {

  const { username } = req.query;
  req.session.user = { username };
  res.end();
});

// 用户信息展示(已登录则展示,未登录则不展示)
app.get('/hello', function (req, res, next) {
  const { username } = req.session.user;
  if(username){
    res.end(`<h1>hello,${username}</h1>`);
  }else{
    res.end('<hi>抱歉，您尚未登录</h1>');
  }
})

app.listen(3000)