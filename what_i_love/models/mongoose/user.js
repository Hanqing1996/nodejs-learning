const mongoose=require('mongoose');
const { Schema }=mongoose;

mongoose.set('useCreateIndex', true)

const UserSchema=new Schema({
    name:{type:String,required:true,unique:true,index:1},
    age:{type:Number,max:100,min:0},
    subscription:{}
});

const UserModel=mongoose.model('user',UserSchema);

async function insert(user){
    const created=await UserModel.create(user);
    return created;
}

async function getOneById(id){
    const user=await UserModel.findOne({_id:id});
    return user;
}

async function getOneByName(name){
    const user=await UserModel.findOne({name});
    return user;
}

async function list(params){
    const filter={};
    const flow=UserModel.find(filter);
    const users=await flow.exec();
    return users; //在这里设置断点，可以看到users的成员具体信息
}

module.exports={
    insert,
    getOneById,
    getOneByName,
    list
}