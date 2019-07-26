const http=require('http')
const server=http.createServer();
server.listen(8000);

// 根据不同url返回不同响应结果
/*
// 输入:localhost:8000/hello 
server.on('request',(req,res)=>{

    const url=req.url; // /hello
    console.log(url)

    let responseStr

    if(url==='/hello'){ // ===表示完全匹配
        responseStr='hi there'
    }
    else if(url==='/bye'){
        responseStr='see yoy tomorrow'
    }
    else{
        responseStr='I know nothing'
    }
    
    res.statusCode=200;
    res.end(responseStr);
});
*/



// 解析query
/*
// 输入:localhost:8000?i_need_money=true&how_much=1000
const qs=require('querystring');
server.on('request',(req,res)=>{
    
    const url=req.url;// /?i_need_money=true&how_much=1000
    const querystr=url.substr(url.indexOf('?')+1,url.length); // i_need_money=true&how_much=1000
    const query=qs.parse(querystr); // query为一个对象

    // 提取query参数
    if(query.i_need_money==='true'&&query.how_much==='1000')
    {
        res.statusCode=200;
        res.end('go away');
    }
});
*/

// 解析path,query.根据不同method返回不同内容

// 输入:localhost:8000/user?quan=3&people=china
/*
let temp=4
server.on('request',(req,res)=>{

    users=[1,2,3];

    const url=req.url; // /user?quan=3&people=china
    const path=url.substr(0,url.indexOf('?')) // /user
    const query=url.substr(url.indexOf('?')+1,url.length) // quan=3&people=china

    switch(path){
        case '/user':

            // 注意req.method和req.url没有关系
            switch(req.method){
                case 'GET':
                    res.statusCode=200;
                    res.end(JSON.stringify(users)) // 获取users
                    break;
                case 'POST':
                    users.push(temp++);
                    res.statusCode=200;
                    res.end(JSON.stringify(users)) // 增加user
                    break;    
            }
            break;

        default:
            res.statusCode=404
            res.end('')
            break;    
    } 
});
*/

// 解析HTTP请求体

// 输入:localhost:8000/user?quan=3&people=china
server.on('request',(req,res)=>{

    const users=[];
    const url=req.url; // /user?quan=3&people=china
    const path=url.substr(0,url.indexOf('?')) // /user
    const query=url.substr(url.indexOf('?')+1,url.length) // quan=3&people=china

    switch(path){
        case '/user':

            switch(req.method){
                case 'GET':
                    res.statusCode=200;
                    res.end(JSON.stringify(users))
                    break;
                case 'POST':

                    const contentType=req.headers['content-type']
                  
                    // 指定请求体内容格式
                    if(contentType!=='application/json'){
                        res.statusCode=400;
                        res.end('error');
                    }

                    let requestBodtStr=''
                    req.on('data',function(data){
                        requestBodtStr+=data.toString();
                    });
                    req.on('end',function(){
                        const user=JSON.parse(requestBodtStr);
                        users.push(user);
                        res.statusCode=200;
                        res.end(JSON.stringify(user));
                    });
                    break;    
            }
            break;
        
        default:
            res.statusCode=404
            res.end('')
            break;    
    } 
});