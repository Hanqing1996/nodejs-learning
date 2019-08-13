/**
 * http_error_handle捕捉所有http相关的错误,无论该错误在之前是否已经被捕捉
 * 注意http_error_handle只判断错误是否属于基类HTTPBaseError
 */

const HTTPBaseError=require('../errors/http_base_error');

function handler(opts){

    // 返回一个中间件
    return function (err,req,res,next){ 

        // 判断err是否为HTTPBaseError类型
        if(err instanceof HTTPBaseError){

            // 对应http_base_error的httpStatusCode,message,errCode,这一步通过各个子类的super实现
            console.log(err.httpStatusCode+' '+err.message+' '+err.errCode+' '+err);

            res.statusCode=err.httpStatusCode;

            res.json({
                code:err.errCode,
                msg:err.httpMsg,
            })
        }else{
            next(err)
        }
    };
}

module.exports=handler;