const express=require('express');
const http=require('http');
const app=express(); 


// 中间件:对请求流程的封装
app.use((req,res,next)=>{
   console.log('oh you got middleware no.1');
   req.duang=1
   next();
});

app.use((req,res,next)=>{
    console.log('oh you got middleware no.2');
    console.log(`{duang:${req.duang}}`); 
    next();
 });

app.use((req,res)=>{
    res.end('you got end');
});  
  
const server=http.createServer(app);

server.listen('8888');