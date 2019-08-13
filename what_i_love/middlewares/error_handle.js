function handler(opts){

    // 返回一个中间件
    return function (err,req,res,next){
        console.log('uncaught error in the middleware process',err);
    };
}

module.exports=handler;