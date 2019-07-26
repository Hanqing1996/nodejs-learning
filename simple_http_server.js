const http=require('http');
const server=http.createServer();
server.listen(8000);

// 根据不同url返回不同响应结果
// let count=0
// server.on('request',(req,res)=>{

//     const url=req.url; // 用户向浏览器发送一个请求地址

//     let responseStr

//     if(url==='/hello'){ // ===表示完全匹配
//         responseStr='hi there'
//     }
//     else if(url==='/bye'){
//         responseStr='see yoy tomorrow'
//     }
//     else{
//         responseStr='I know nothing'
//     }
    
//     res.statusCode=200;
//     res.end(responseStr);
// });