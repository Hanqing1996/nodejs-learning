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
/*
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
*/



// 错误中间件
/*
app.use((req,res,next)=>{

    // next被放入参数,直接跳转到错误中间件
    next('something wrong'); 
});

// 这个中间件不会执行
app.use((req,res,next)=>{ 
    res.end('all right')
});

// 错误中间件处理错误
app.use((err,req,res,next)=>{
    res.end(err);
});

const server=http.createServer(app);

server.listen('8888');
*/


// 中间件的函数写法
/*
function mw1(req,res,next){
    console.log('mw1');
    next();
}

function mw2(req,res,next){
    console.log('mw2');
    next();
}

function mw3(req,res,next){
    console.log('mw3');
    res.end()
}

// 等价于app.use([mw1,mw2],mw3)
app.use(mw1,mw2,mw3)

const server=http.createServer(app);

server.listen('8888');
*/


// 解析请求体
// 详见https://xiedaimala.com/tasks/36b40d29-f099-4f18-a945-6a51d3d0ec9c/video_tutorials/8eccf75f-6861-4ae1-a93d-4a91d937e276
// urlencoded(键值对)和json是两种Content-Type,可在postman中设置
// 输入:localhost:8888，method选择post
const bodyParser=require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next)=>{
    console.log(req.body);
    res.end('');
});

const server=http.createServer(app);

server.listen('8888');

