// 连接数据库,注意由于创建的what_i_love数据库为空,在mongo命令下是找不到what_i_love数据库的

const mongoose=require('mongoose');

mongoose.Promise=Promise;

const uri='mongodb://localhost:27017/what_i_love'; // 端口号可通过db.getMongo()获得
mongoose.connect(uri,{useNewUrlParser:true});
const db=mongoose.connection;

db.on('open',()=>{
    console.log('db connected!');
});

db.on('error',(e)=>{
    console.log(e);
});


// 建立users表,并实现增删改查

mongoose.set('useCreateIndex', true) //加上这个

const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;
// Object=mongoose.Types.ObjectId;

// 约束规范
const UserSchema=new Schema({
    name:{type:String,required:true,unique:true,index:1},
    age:{type:Number,max:188,min:[0,'you are too young to ben born']},
});

const UserModel=mongoose.model('user',UserSchema);

// 增删改查
(async ()=>{

    // 插入
    /*
    const u=await UserModel.create({
        name:"xiaoli",
        age:1,
    }); 
    return u;
    */

    // 删除
    /*
    const u=await UserModel.remove({
        name:"bigxiong",
    }); 
    return u;
    */


    // 修改
    /*
    const u=await UserModel.update({
        name:"smallxiong",
    },{age:69}); 

    return u;  
    */  

    // 查询
    const u=await UserModel.find({
        name:"smallxiong",
    }); 
    return u;

})()
.then(r=>{
    console.log(r);
})
.catch(e=>{
    console.log(e);
});


// 参数查询
(async (params)=>{

    const filter={};
    if(params.name) filter.name=params.name;

    const flow=UserModel.find(filter);

    if(params.projection) flow.select(params.projection);

    if(params.sort) flow.sort(params.sort);

    const users=await flow.exec();
    return users;
})({
    name:"xiaoli",
    projection:{age:1},
    sort:'-age' // 逆序
})
.then(r=>{
    console.log(r);
})
.catch(e=>{
    console.log(e);
});
