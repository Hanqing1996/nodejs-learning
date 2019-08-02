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

module.exports=db;