
/**
 * 抛出一个错误
 */
throw new Error('something wrong')


const obj={
    message:'something wrong'
};
Error.captureStackTrace(obj);
throw obj;


/**
 * 在同步代码中捕获一个抛出的错误
 */
try {
    throw new Error('something wrong')
} catch (error) {
    console.log(err);
}

/**
 * 回调函数处理错误
 * 缺陷:不够显式地处理错误
 * 
 */
function foo(params,cb){

    // 处理异步任务（比如处理HTTP请求）时出错
    const err=new Error('Http wrong');

    // 返回error给cb
    if(err){
        cb(err);
    }
}

foo({},(err,result)=>{
    if(err){
        console.log('cb deal err');
    }
})


/**
 * 用catch捕获在async函数抛出的错误
 */
async function foo(){
    throw new Error('foo function got wrong')
}

foo().catch(e=>{
    console.log('caught foo wrong');
});

/**
 * 用try/catch捕获async函数中的某一步抛出的错误
 */
async function foo(){
    try {
        await bar();
    } catch (err) { // 这里的err由bar抛出
        console.log('caught foo wrong');
    }
}

async function bar(){
    throw Error('bar function got wrong');
}

foo();

/**
 * 将抛出的错误在捕获后继续抛出给外层
 */
async function foo(){
    try {
        await bar();
    } catch (err) { // 这里的err由bar抛出
        console.log('caught bar wrong');
        throw new Error('bar wrong got wrong');
    }
}

async function bar(){
    throw new Error('bar function got wrong');
}

try {
    await foo();
} catch (err) {
    console.log('caught foo wrong');
}
