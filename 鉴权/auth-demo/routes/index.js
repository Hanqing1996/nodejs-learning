var express = require('express');
var router = express.Router();



// localhost:3000/login?username=wqf
// localhost:3000/hello


/**
 * users是服务器记录的已登录用户列表，这个表是给服务器用的，不是给浏览器用的
 * 每次重启服务器(node bin/www),users重置为[]
 * 每次在query中传入一个新的username,users会添加新用户
 * 综上所述,users是用来记录本次服务器启动以来,登录过的所有用户
 */
const users = []

router.get('/login', function (req, res, next) {

  console.log(users);

  const { username } = req.query;
  if (!users.find(u => u.username === username)) {
    res.set('Set-Cookie', `username=${username}`);
    users.push({
      username,
    })
  }
  res.end();

});
router.get('/hello', function (req, res, next) {
  const { username } = req.cookies;
  if (users.find(u => u.username === username)) {
    res.set('Content-Type', 'text/html;charset=utf-8')
    res.end(`<h1>您已登录,${username}<h1> `)
  } else {
    res.set('Content-Type', 'text/html;charset=utf-8')
    res.end(`本次服务器启动以来，您从未登录`)
  }
})


module.exports = router;
