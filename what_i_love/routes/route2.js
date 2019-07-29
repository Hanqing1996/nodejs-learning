var express = require('express');
var router = express.Router();

// 路由提前中断与错误处理的区别
/*
如果调用next的时候传入任何值，除了'router'字符串以外，均会触发err中间件,
如果next('router')，则是跳过当前中间件栈的处理流程，直接进入下一个router中间件中
*/

// 错误处理:next参数不为'router',输出mw1,mw2
/*
router.use('/',(req,res,next)=>{
    console.log('mw1');
    next('some thing wrong')
})

// 错误中间件
router.use('/',(err,req,res,next)=>{
    console.log('mw2');
    res.end(err) // 不再执行下一个中间件
})
module.exports = router;
*/

// 路由提前中断:next参数为'router',只输出mw1
router.use('/',(req,res,next)=>{
    console.log('mw1');
    next('router')
})

// 错误中间件
router.use('/',(req,res,next)=>{
    console.log('mw2');
    next() // 按照app.js中的路由设置顺序继续执行下一个中间件
})
module.exports = router;