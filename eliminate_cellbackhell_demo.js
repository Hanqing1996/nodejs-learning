const MAX_YSER_ADDCTION_CONTROL_AGE=18;

async function getUserInfoFromDB(userId){
    const user={age:0}
    user.age=17+Math.ceil(Math.random()*2)
    setTimeout(()=>{
        return user;
    },1000)
}

async function isIdentityCardValid(user){
    setTimeout(()=>{
        return true;
    },1000)
 }

 async function enterAddictionControlSys(user){
    setTimeout(()=>{
        return true;
    },1000)
 }


(async ()=>{
    const user=await getUserInfoFromDB('userId1');

    let idvalid=false;
    let enterACSPromise;

    if(user.age>MAX_YSER_ADDCTION_CONTROL_AGE){

        idvalid=await isIdentityCardValid(user);
        if(!idvalid){

            // 注意这里没有用await,所以enterACSPromise是一个Promise对象
            enterACSPromise=enterAddictionControlSys(user);
        }
    }else{
        enterACSPromise=enterAddictionControlSys(user);
    }

    // 注意这里没有用await,所以levelInfoPromise是一个Promise对象
    const levelInfoPromise=getLevelInfo(user);

    // results是一个长度为2的数组,储存enterACSPromise和levelInfoPromise的resolved的结果
    const results=await Promise.all([enterACSPromise,levelInfoPromise])

    if(results[0]&&results[1]>20){
        console.log('done');
    }else{
        console.log('dommed');
    }

})()


s




1 2 5 4 7 3 6