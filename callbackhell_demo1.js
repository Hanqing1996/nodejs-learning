/**
 * 需求如下：
 * 1. 从数据库中取出某个用户信息
 * 2. 根据用户年龄决定以下流程
 * 2-1. 年龄小于18岁，进入防沉迷系统
 * 2-2. 年龄大于18岁，查看是否为真实身份证
 * 3. 根据以上结果,进入游戏
 */

 function getUserInfoFromDB(userId,callback){
     const user={age:0}
     user.age=17+Math.ceil(Math.random()*2)
     setTimeout(()=>{
         // 如果用户存在
         callback(null,user)
         // 如果用户不存在
         // callback(null, null)
     },1000)
 }

const MAX_YSER_ADDCTION_CONTROL_AGE=18;

function isIdentityCardValid(user,callback){
    setTimeout(()=>{
        callback(null,true)
    },1000)
}

function enterAddictionControlSys(user,callback){
    setTimeout(()=>{
        callback(null,true)
    },1000)
}

getUserInfoFromDB('userId1', (err,user)=>{
    if(err){
        console.log('error getting uer',err);
        return;
    }

    if(user.age>MAX_YSER_ADDCTION_CONTROL_AGE){
        isIdentityCardValid(user,(err,valid)=>{
            if(valid){
                console.log('done');
            }
            else{
                enterAddictionControlSys(user,(err,result)=>{
                    console.log('invalid id,entter ACS');
                })
            }
        })
    }
    else{
        enterAddictionControlSys(user,(err,result)=>{
            console.log('invalid id,entter ACS');
        })
    }
})