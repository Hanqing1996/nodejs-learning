// 连接数据库
/*
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
*/









const mongoose=require('mongoose');

mongoose.Promise=Promise;

const Schema=mongoose.Schema;

const ObjectId=Schema.Types.ObjectId;
// Object=mongoose.Types.ObjectId;

const uri='mongodb://localhost:27017/what_i_love'; // 端口号可通过db.getMongo()获得
const connection=mongoose.connect(uri,{useNewUrlParser:true});
const db=mongoose.connection;

const UserSchema=new Schema({
    name:{type:String,required:true,unique:true},
    age:{type:Number,max:188,min:0},
});

const UserModel=mongoose.model('user',UserSchema);

(async ()=>{

})()
.then(r=>{
})
.catch(e=>{
})
db.on('open',()=>{
    console.log('db connected!');
});

db.on('error',(e)=>{
    console.log(e);
});