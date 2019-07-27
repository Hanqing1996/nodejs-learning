const express=require('express');
const http=require('http');
const app=express(); 


// 中间件特点:按代码顺序执行
/*
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
*/


// 中间件应用:鉴权

// 输入:localhost:8888?username=liming&&age=14
function auth(req,res,next){
    if(req.query.username==='liming'){
        next();
    }
    else{
        res.end('please go away');
    }
}

app.use(auth);  

app.use((req,res,next)=>{
    res.end(`welcome,${req.query.username}`)
})
  
const server=http.createServer(app);

server.listen('8888');