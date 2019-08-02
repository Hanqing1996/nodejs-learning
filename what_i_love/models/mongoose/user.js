const mongoose=require('mongoose');
const schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{type:String,required:true,unique:true,index:1},
    age:{type:Number,max:100,min:0},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
});

const UserModel=mongoose.model('user',UserModel);

// 对应in_memo/user的insert方法
async function insert(user){
    return await UserModel.create(user);
}

async function getOneByName(firstname,lastname){
    return await UserModel.findOne({firstname,lastname});
}

async function list(params){
    const filter={};
    const flow=UserModel.find(filter);
    return await flow.exec();
}

module.exports={
    insert,
    getOneById,
    getOneByName,
    list
}