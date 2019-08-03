const mongoose=require('mongoose');
const { Schema }=mongoose;
const { ObjectId }=Schema.Types;

mongoose.set('useCreateIndex', true)

const UserSchema=new Schema({
    userId:{type:ObjectId,required:true,index:1},
    url:{type:String,required:true},
});

const SubModel=mongoose.model('Sub',SubModel);

async function insert(sub){
    const created=await SubModel.create(sub);
    return created;
}

async function findByUserId(userId){
    const subs=await SubModel.find({userId});
    return subs;
}

async function list(params){
    const filter={};
    const flow=SubModel.find(filter);
    const subs=await flow.exec();
    return subs; //在这里设置断点，可以看到users的成员具体信息
}

module.exports={
    insert,
    getOneByUserId,
    list
};