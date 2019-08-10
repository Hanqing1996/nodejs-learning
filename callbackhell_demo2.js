/**
 * 需求升级(加入校验)：
 * 1. 从数据库中取出某个用户信息
 * 2. 根据用户年龄决定以下流程
 * 2-1. 年龄小于18岁，进入防沉迷系统
 * 2-2. 年龄大于18岁，查看是否为真实身份证
 * 3. 根据用户信息，查询是否在游戏中达到一定等级
 *    如果达到,进入某个页面
 * 4. 根据以上结果,进入游戏
 */

 function getUserInfoFromDB(userId,callback){
    let levelOver20=false;
    let enterACS=false; 
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
                   enterACS=true;
                   if(levelOver20&&enterACS){
                       console.log('done');
                   }
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

 function getLevelInfo(user,callback){

 }


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

   getLevelInfo(user,(err,level)=>{
       if(level>20){
           levelOver20=true;
       }
        levelOver20=true;
        if(levelOver20&&enterACS){
            console.log('done');
        }
   })
})