var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.use(cookieSession({
  name: 'demoSession',
  keys: ['12345678']
}))

app.get('/login', function (req, res, next) {

  const { username } = req.query;
  req.session.user = { username };
  res.end();
});

app.get('/hello', function (req, res, next) {
  const { username } = req.session.user;
  res.end(`<h1>hello,${username}</h1>`);
})

app.listen(3000)