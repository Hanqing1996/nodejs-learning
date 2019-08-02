// 连接数据库,注意由于创建的what_i_love数据库为空,在mongo命令下是找不到what_i_love数据库的

const mongoose=require('mongoose');

mongoose.Promise=Promise;

const uri='mongodb://localhost:27017/what_i_love'; // 端口号可通过db.getMongo()获得
const connection=mongoose.connect(uri,{useNewUrlParser:true});
const db=mongoose.connection;

db.on('open',()=>{
    console.log('db connected!');
});

db.on('error',(e)=>{
    console.log(e);
});


// 建立users表

mongoose.set('useCreateIndex', true) //加上这个
const connection=mongoose.connect(uri,{useNewUrlParser:true});

const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;
// Object=mongoose.Types.ObjectId;


const UserSchema=new Schema({
    name:{type:String,required:true,unique:true,index:1},
    age:{type:Number,max:188,min:0},
});

const UserModel=mongoose.model('user',UserSchema);

(async ()=>{

    const u=await UserModel.create({
        name:"smallxiong",
        age:20,
    }); 

})()
.then(r=>{
})
.catch(e=>{
});
