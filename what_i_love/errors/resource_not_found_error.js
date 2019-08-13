const HTTPBaseError=require('./http_base_error');

// 比如：4040001表示文章未找到，4040002表示用户未找到.....
const ERROR_CODE=4040000;

class HTTPReqParamError extends HTTPBaseError{

    // paramName是错误类型名(userId等)，desc是展示给用户看的信息，
    constructor(resourceName,resourceId,httpMsg){

        // httpStatusCode,httpMsg,errCode,msg
        super(404,httpMsg,ERROR_CODE,resourceName+'not found:'+resourceId);
    }
}

module.exports=HTTPReqParamError;