import { createBrotliCompress } from "zlib";

(async ()=>{

    function dealwithObjAsync(obj){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                per.age=12;
                resolve();
            },10000)
        })
    }
    
    const per={};
    
    console.log(per);
    
    await dealwithObjAsync(); // await is only valid in async function
    
    console.log(per);

})()
