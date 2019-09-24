#### base64编码
```
> node
> new Buffer('eyJ1c2VyIjp7InVzZXJuYW1lIjoiaWlpIn19=','base64').toString()
'{"user":{"username":"iii"}}'
```
#### request不能 


#### 进程
* 查看进程
> netstat -tln
* lsof -i :3000
> 查看占用3000端口的进程
* 杀死PID为xxx的进程
> kill -9 xxx
#### z
* [教程](https://xiedaimala.com/tasks/11ad5683-7e18-4883-879d-8425e6a6ceb7/video_tutorials/d044ad5f-102b-4417-821c-015675d104c8)
* 作用
> 在目录之间快速切换(没去过的目录不能跳转)
* 用法
```
. ~/.zshrc(已用alias rename为 zz)
z 桌面
```
#### nvm与node安装
[教程](https://xiedaimala.com/tasks/09e02796-29a6-4e4b-90f1-122d4dcdcacc/text_tutorials/7484ad66-f446-4c22-af5d-7ece2f731303)

#### 关于端口
* express_demo:8888
* what_i_love:3000

#### 搭建http服务器
* [code](https://github.com/Hanqing1996/nodejs-learning/blob/master/simple_http_server.js)
* url的组成:
```
Schema://host:port/path?query#hash
```
比如
```
address://putong.shanghai.china/jinkeroad/1111'
```
* but
> 对于‘localhost:8000/user?quan=3&people=china‘
```
const url=req.url; // url='/user?quan=3&people=china'
```
* 为什么url通常看不见port
> 存在默认端口(80,443)
* HTTP方法分类
1. GET 
> 获取某种资源
2. POST
> 新建
3. PATCH
> 修改
4. OPTIONS
> 列举可进行的操作

#### 响应常见的状态码：
2. 2xx 请求成功 200成功 201创建 202接受 203代理 206部分处理
3. 3XX 重定向 302找到，重定向 304未修改
4. 4xx 客户端错误 400请求内容错误 401无权限 403禁止访问 404你懂的
5. 5xx 服务器错误 500服务器炸了 502网关炸了 503炸几分钟 504超时


#### 流
* 拿到数据时(用桶打水)
```
 req.on('data',function(data){
     requestBodtStr+=data.toString();
     });
```
* 数据全拿到时（桶里的水倒入池子,桶空）
```
 req.on('end',function(){
    const user=JSON.parse(requestBodtStr);
    users.push(user);
    res.statusCode=200;
    res.end(JSON.stringify(user));
    });
```
#### node.js中的exports
* [exports一个类](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/services/user_service.js)
* [exports一些方法](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/models/mongoose/user.js)
* [exports一个对象](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/services/mongodb_connection.js)

#### 用express-generator创建项目(较复杂,工程用)
* 安装express-generator(-g表示全局安装,之后再输入该指令将只显示更新信息)
```
cd nodejs-learning
npm i -g express-generator
```
* 生成项目what_i_love
```
cd nodejs-learning
express --view=ejs what_i_love
```
* 安装依赖(生成node-modules目录及所需包，从github上获得的文件没有node-modules,也需要这样处理)
```
cd what_i_love
npm install
```
* 启动服务器
```
node bin/www
```
* 启动客户端(浏览器)
localhost:3030 具体端口号在bin/www文件中查看 
```
var port = normalizePort(process.env.PORT || '3030');
```

#### 用express-generator创建的项目文件目录
* public:静态文件目录
* bin/www:启动入口
* app.js:文件配置
* views:渲染目录

#### 用express创建demo(较简单，实验用)
* 初始化npm(这一步会生成package.json)
```
npm init
```
* 安装express
```
npm i --save express
```
* 启动服务器:运行index.js(自己创建哦)
```
node index.js
```
* 启动客户端(浏览器)
localhost:3000 具体端口号在index.js文件中查看 
```
app.listen(3000)
```
#### 中间件
[code](https://github.com/Hanqing1996/nodejs-learning/blob/master/express_demo/index.js)
* 定义
对请求流程的封装
* 特点
1. 执行顺序符合代码上下文顺序
2. 最后一个中间件必须有res.end('xx')
3. 可通过中间件来控制route
```
app.use('/article',mw1) // path为'localhost:8888/article/...'时，执行mw1
```
4. 可设置method来进一步控制route
```
app.get('/article',mw1) // 当且仅当path为'localhost:8888/article/...'时，且method为get时执行mw1

app.post('/title',mw2) // 当且仅当path为'localhost:8888/title/...'时，且method为post时执行mw2
```
5. [路由提前中断与错误处理的区别](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/routes/route2.js)

#### 网关
负责接收请求，并且把请求分发到处理业务的不同逻辑上去。

#### req.query与req.body的区别
* req.query在url里，位于HTTP请求头的第一行。而req.body在body里，位于HTTP请求体中
* 在express中req.query可以直接访问
```
username=req.query.name;
```
而访问req.body需要先调body-parser

#### NODE_ENV
* 命令行输入 NODE_ENV=production node bin/www,以下错误信息不会显示
```
404
NotFoundError: Not Found
    at /home/zhq/nodejs-learning/what_i_love/app.js:27:8
    at Layer.handle [as handle_request] (/home/zhq/nodejs-learning/what_i_love/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/home/zhq/nodejs-learning/what_i_love/node_modules/express/lib/router/index.js:317:13)
......
```
这是因为在app.js中有如下设置
```
res.locals.error = req.app.get('env') === 'development' ? err : {};
```
所以当环境变量不为development时，只返回一个空对象而非err

#### 路由提前中断
* [code](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/routes/route2.js)

#### express中的MVC
* [Model](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/models/in_memo/user.js)
* [View](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/views/user.ejs)
* [Controller](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/routes/users.js)
<br>
在express中由router实现
* [Services](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/services/user_service.js)
<br>
当我们需要操纵多个model时,service负责对多个Model进行组合操作

#### Debug注意事项
1. 开启Debug就不要再启动项目，Debug已经启动了项目
2. 设置正确的断点位置很重要
3. 如果设置断点后还需要方向键，就说明位置不正确

#### 常见数据库
* postgresql
适合分布式系统，支持json格式
* Mysql
不再开源，会有顾虑
* oracle
稳定
* mongodb
NoSQL数据库，并发量优于MySQL
* redis
NoSQL数据库,key-value数据库
* memocache
NoSQL数据库

#### NoSQL的通病
事务机制不友好(订单系统不要用mongodb)

#### 查看mongodb端口号
```
db.getMongo()
```
#### RoboMongo
* [教程](https://www.jianshu.com/p/4e1691545fe9)

#### mongodb的安装，运行(it will be long)
* [参考教程1](https://blog.csdn.net/qq_24672657/article/details/86703342)
* [参考教程2](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu-tarball/)
1. 在/home/zhq 目录下创建mongodb文件夹
2. 在mongodb目录下执行
```
sudo apt-get install libcurl3 openssl
```
这一步的目的是安装必要的依赖文件，还没有安装mongodb
3. 在[官网](https://www.mongodb.com/download-center/community?jmp=docs)下载安装包，注意package选择TGZ
4. 将安装包放至mongodb文件夹中，在mongodb目录下执行以下命令解压
```
tar zxvf mongodb-linux-x86_64-ubuntu1604-4.0.11.tgz
```
5. 在mongodb目录下执行以下命令重命名解压后的文件
```
mv mongodb-linux-x86_64-ubuntu1604-4.0.11 mongodb-4.0.11
```
6. 在mongodb目录下面，创建data目录，在data目录下创建db目录和logs
```
mkdir data
cd data
mkdir db
touch logs
```
7. 在data目录下 创建 my.conf 文件,编辑文件内容如下(vi my.conf)
```
#端口号
port = 27017
#数据目录
dbpath = /usr/local/mongodb/data
#日志目录
logpath = /usr/local/mongodb/data/logs
#设置后台运行
fork = true
#日志输出方式
logappend = true
#开启认证
#auth = true
```
8. 启动mongodb(新终端,直接输入以下命令)
```
mongod --dbpath /home/zhq/mongodb/mongodb-4.0.11/data/db
```
正常情况下最后一行信息为
```
waiting for connections on port 27017
```
* mongod --dbpath 命令是创建数据库文件的存放位置；
* 每次启动mongodb服务时需要先确定数据库文件存放的位置，否则系统不会自动创建，启动会不成功。
* 注意27017是被连接的端口，而连接到这个接口的可能有多个接口(43832,46252等等)，可通过mongod --dbpath信息查阅
```
（3 connections now open)
```
9. 连接mongodb(新终端,直接输入以下命令)
```
momgo
```
关闭momgo命令终端后，connection数减1
10. 总结：要使用mongodb,必须要两个命令
```
mongod --dbpath /home/zhq/mongodb/mongodb-4.0.11/data/db

momgo
```
#### mongodb数据库操作(mongo shell下)
* 查看所有数据库
```
show databases
```
* 转到what_i_love数据库(如果没有则自动创建一个)
```
use what_i_love
```
* 查看当前数据库的表
```
show collections
```
* 删除当前数据库
```
db.dropDatabase()
```
#### mongodb表操作
* 伴随记录的插入，自动创建表users
```
db.users.insert({name:'zhq',age:101})
```
* 查找当前数据库中所有的表
```
show collections
```
* 删除users表
```
db.users.drop()
```
#### mongodb记录操作(增)
* 在users表中插入数据，name值为'zhq',age值为101，
```
db.users.insert({name:'zhq',age:101})
```
#### mongodb记录操作(删)
* 删除users表中name为'jack'的所有数据
```
db.users.deleteOne({name:'jack'})
``` 
* 删除users表中所有记录
```
db.users.remove({})
```
#### mongodb记录操作(改)
* 查找name为"zhq"的记录，并修改其age字段(其它字段不变)
```
db.users.update({name:'zhq'},{$set{age:19}})
```
等价于
```
UPDATE users 
SET 
    age = 19
WHERE
    name = 'zhq';
```
* 查找name为"xiao"的记录，并抹去其age字段(其它字段保留)
```
db.users.update({name:'xiao'},{$unset:{age:true}})
```
#### mongodb记录操作(查)

1. 基本格式:db.collection.find({}),{}表示筛选(filter)条件,等价于select ...
2. 对于find({},{}),第一个{}表示where,第二个{}表示select(mongodb中称为projrction)
* 查找age为15的记录，且只显示city列(但_id是一定显示的)
```
db.users.find({age:15},{city:1})
```
* 查找age为15的记录，除了city列外其他列都显示
// 1可以理解为只选
```
db.users.find({age:15},{city:0})
// 0可以理解为反选
```
* 查看users表所有记录
```
db.users.find()
// 如果想使得查询结果格式化，可使用db.users.find().pretty()
```
* 查找users表中age为1234的记录
```
db.users.find({age:1234})
```
* 查找users表中name为"nezha",age为1001的记录
```
db.users.find({name:"nezha",age:1001})
```
* 查找users表中age大于13,小于29，city值为Hangzhou的那行数据
```
db.users.find({age:{$gt:13,$lt:29},city:'Hangzhou'})
//gte:大于等于；lte:小于等于
```
* 查找users表中不含age属性的数据
```
db.users.find({age: {$exists:false} })
```
* 数组字段查询
```
db.users.find({hobbies:"drink"})
```
结果为
```
{
	"_id" : ObjectId("5d402c77cf6da402e004f251"),
	"name" : "laoxiong",
	"hobbies" : [
		"eat",
		"drink",
		"sleep"
	]
}
```
* 对象字段查询1
```
db.users.find({'hobbies.hiking':{$exists:true}})
```
结果为
```
{
	"_id" : ObjectId("5d402ce6cf6da402e004f252"),
	"name" : "middlexiong",
	"hobbies" : {
		"hiking" : "great",
		"swimming" : "poor"
	}
}
{
	"_id" : ObjectId("5d402ce6cf6da402e004f252"),
	"name" : "middlexiong",
	"hobbies" : {
		"hiking" : "great",
		"swimming" : "poor"
	}
}
```

* 对象字段查询2
```
db.users.find({'hobbies.hiking':'great'})
```
结果为
```
{
	"_id" : ObjectId("5d402bb7cf6da402e004f250"),
	"name" : "xiaoiong",
	"hobbies" : {
		"hiking" : "great",
		"swimming" : "poor"
	}
}
```
* 对象数组字段查询
```
db.users.find({'hobbies.name':'hiking'})
```
结果为
```
{
	"_id" : ObjectId("5d402edccf6da402e004f253"),
	"name" : "superxiong",
	"hobbies" : [
		{
			"name" : "hiking",
			"level" : "great"
		},
		{
			"name" : "snowing",
			"level" : "bad"
		}
	]
}
```
* 对象数组指定顺序字段查询
有数据集如下
```
{
	"_id" : ObjectId("5d402edccf6da402e004f253"),
	"name" : "superxiong",
	"hobbies" : [
		{
			"name" : "hiking",
			"level" : "great"
		},
		{
			"name" : "snowing",
			"level" : "bad"
		}
	]
}
{
	"_id" : ObjectId("5d426392cf6da402e004f254"),
	"name" : "minixiong",
	"hobbies" : [
		{
			"name" : "flying",
			"level" : "great"
		},
		{
			"name" : "hiking",
			"level" : "bad"
		}
	]
}
```
执行
```
db.users.find({'hobbies.0.name':'hiking'}).pretty()
```
结果为
```
{
	"_id" : ObjectId("5d402edccf6da402e004f253"),
	"name" : "superxiong",
	"hobbies" : [
		{
			"name" : "hiking",
			"level" : "great"
		},
		{
			"name" : "snowing",
			"level" : "bad"
		}
	]
}
```
#### findOneAndUpdate(用户登录，若没注册则自动注册)
原子性操作
```
db.users.findOneAndUpdate({name:xiexieni},{$set:{age:11}},{upsert:true})
```
"非原子操作会带来脏数据"这句话是何意思?
```
比如先find,再insert;这两个动作合成的一个操作就不是一个原子操作，在find完毕之后可能数据又被别的操作写入，这时我们再写入就会造成重复写入
```
#### options
db.collection.operate({},{},{options})
* multi:将所有name为'jojo'的记录的age字段值修改为100
```
db.users.update({name:'jojo'},{$set:{age:100}},{multi:true})
```
#### "自增变量"型主键的缺陷
* 主键的作用是作为当前这行数据的唯一标识。
* 从前，人们用到的数据量比较小，因此采用"自增变量"作为一行数据的主键
* 然而随着数据量越来越大，问题开始暴露出来：假如有A,B,C三张表，都是"用户注册表"的分表(即A,B,C所有行数据的主键必须不重复，因为他们其实同属于一张表)，如果A表要填入新数据，遵循"自增变量"原则，就需要先去询问"用户注册表"，查询到最新主键值，再加1，设置为A表新数据的主键值。而一旦负责存放最新主键值的数据库所在服务器出了问题，就意味着A,B,C的业务都无法再进行了。

#### mongodb的主键
* id设置方式 
MongoDB中的主键id以时间戳为基础，以进程编号，服务器名称为后缀，以此保证新数据填入时一定有一个独一无二的标识，从而免去与"用户注册表"的主键查询交互。
* 新生成一个id
```
var id=ObjectId()
```
* 获取创建id的时间
```
id.getTimestamp()
```
#### mongoeb的表不需要设置空值，且每个记录的字段情况都可以不同
比如
```
db.users.insertOne({name:"liming",age:15})
db.users.insertOne({city:"chengdu",sex:"male"})
```
则users表内容为
```
{
	"_id" : ObjectId("5d401910cf6da402e004f249"),
	"name" : "liming",
	"age" : 15
}
{
	"_id" : ObjectId("5d40193fcf6da402e004f24a"),
	"city" : "chengdu",
	"sex" : "male"
}
```
#### mongodb聚合
* 语法
```
db.users.aggregate([
    {
     $match:{
         查找目标字段:{
             字段筛选条件
         }
     }
    },
    {
     $group:{
         _id:"$数据分组依据字段",
         select_column:{
             $操作符:"$受处理字段"
         }
     }
    }
])
```
* 将存在age字段的记录按照name分组,并统计各组年龄之和
```
db.users.aggregate([
    {
     $match:{
         age:{
             $exists:true
         }
     }
    },
    {
     $group:{
         _id:"$name",
         totalAge:{
             $sum:"$age"
         }
     }
    }
])
```
等价于
```
select sum(age) as totalAge
from users
where age exists
group by name;
```
结果为
```
{
    "_id" : "Hanmeimei",
    "totalAge" : 38.0
}

{
    "_id" : "Lilie",
    "totalAge" : 19.0
}

{
    "_id" : "jack",
    "totalAge" : 38.0
}
```
#### unwind:数组拆分
对于
```
{
	"_id" : ObjectId("5d402edccf6da402e004f253"),
	"name" : "superxiong",
	"hobbies" : [
		{
			"name" : "hiking",
			"level" : "great"
		},
		{
			"name" : "snowing",
			"level" : "bad"
		}
	]
}
```
通过
```
db.users.aggregate([
    {
     $match:{
         name:'superxiong'
     }
    },
    {
     $unwind:"$hobbies"
    }
]).pretty()
```
可得到
```
{
	"_id" : ObjectId("5d402edccf6da402e004f253"),
	"name" : "superxiong",
	"hobbies" : {
		"name" : "hiking",
		"level" : "great"
	}
}
{
	"_id" : ObjectId("5d402edccf6da402e004f253"),
	"name" : "superxiong",
	"hobbies" : {
		"name" : "snowing",
		"level" : "bad"
	}
} 
```
#### mongodb索引
* 单独索引:
创建按age升序排列的索引
```
db.users.createIndex({age:1})
//-1则表示降序排列
```
* 组合索引
创建按age升序，按name降序的组合索引
```
db.users.createIndex({age:1,name:-1})
```
* 查看表的所有索引
```
db.users.getIndexes()
```

#### 哪些文件不该上传(不利于，或者说无用于别人运行我的项目的文件，都不该上传)
* .vscode/.idea
* node modules
* [删除github上的编辑器配置文件(.idea,.vscode等)，并在push时忽略配置文件](https://github.com/Hanqing1996/blog/blob/master/github%E7%9B%B8%E5%85%B3/README.md)
* [如何自动生成node modules文件](https://www.jianshu.com/p/8cee0acd6afd)
* package-lock.json文件的作用
> 指定我在运行本地项目时各个module包的版本号,这样别人在获得我的项目时就可以按照package-lock.json文件的内容安装各个包了

#### mongoose_demo(包括增删该查，参数化查询)
* [code](https://github.com/Hanqing1996/nodejs-learning/blob/master/mongoose_demo.js)

#### 用mongoose重构model层
* app.js改动:自己看，有注释
* [models/mongoose/user.js](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/models/mongoose/user.js)
* [models/mongoose/subscription.js]()
* [service/mongodb_connection.js](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/services/mongodb_connection.js)
* [service/user_service_mongoose.js](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/services/mongodb_connection.js)
* [routes/users_mongoose.js](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/routes/users_mongoose.js)
* [views/users_mongoose.ejs](https://github.com/Hanqing1996/nodejs-learning/blob/master/what_i_love/views/users_mongoose.ejs)

#### 启动用mongoose重构后的what_i_love
1. 启动mongodb
```
mongod --dbpath /home/zhq/mongodb/mongodb-4.0.11/data/db
```
2. 启动what_i_love
在what_i_love目录下
```
node bin/www
```
#### Node.js中的回调
* 回调函数(callback)第1个参数为err,第2个及以后为返回的结果
```
function foo(callback){
    setTimeout(()=>{
        console.log('duang');
        callback(null,'resolved');
    },1000);
}

function callback(err,result){
    if(err) return console.log('err');
    console.log(result);
}

foo(callback);
```
* [回调为什么不好:28:00](https://xiedaimala.com/tasks/428449c1-efa6-4a23-98ce-4fdea794f7b7/video_tutorials/d2ad93ba-cd2d-4735-b013-337e23e6563b)
* [回调地狱](https://github.com/Hanqing1996/nodejs-learning/blob/master/callbackhell_demo2.js)
* [用async,await消除回调地狱](https://github.com/Hanqing1996/nodejs-learning/blob/master/eliminate_cellbackhell_demo.js)

#### 错误
1. 在哪里抛出错误
2. 在那里捕捉错误
3. try/catch{}{}与catch(()=>{})等价
```
async function foo(){
    throw new Error('foo wrong got wrong');
}

try {
    await foo();
	console.log('1')
} catch (err) {
    console.log('caught foo wrong');
}
```
等价于
```
async function foo(){
	throw new Error('foor function got wrong');
}

foo().catch((err)=>{
	console.log('caught foo wrong');
})
```
#### error处理实践
* app.js改动:自己看，有注释
* [http错误基类]()
```
httpStatusCode：http状态码,包括200,404,500等
message：描述错误原因
httpMsg：展示给用户的信息
errCode：错误码,是对http状态码的扩展，包括4000001(错误未找到),4000002(用户未找到)等
```
* [request请求参数错误类()]
```
paramName：错误类型描述
desc：展示给用户的信息
msg：描述错误原因
```
* [服务器错误类]()
* [资源未找到类]()
* [http_error_handle]()
作为最后一个错误处理中间件，负责记录所有与http相关的错误
* [error_handle]()
```
uncaught error in the middleware process
```
* [users_errors.js]()

#### 日志分级
```
const levels = { 
  error: 0, 
  warn: 1, 
  info: 2, 
  verbose: 3, 
  debug: 4, 
  silly: 5 
};
```
注意低等级的日志文件将包含高等级错误内容，比如[]

#### 日志滚动(log rotation)
随着服务的运行，日志会越来越大，如果不做管理，迟早会导致服务器磁盘被塞满

#### [服务器把登录信息放在内存中]()
* 缺点:每次服务器重启后登录信息丢失

#### [express中间件:cookie-session](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/session-demo/server.js)
* 把session存储在cookie里面,即把session存在客户端
* 安装
```
npm i cookie-session
```
* [文档](http://www.expressjs.com.cn/en/resources/middleware/cookie-session.html)
* sign
签名,配合cookieSession的keys对cookie信息进行加密


#### [express中间件:express-session]()
* cookie里面存的不是session，而是sessionID,session自身存在redis,mongoodb等服务器端
* 安装
```
npm i express-session
```

#### JWT(jsonwebtoken)
* 安装
```
npm i jsonwebtoken
```
* JWT与cookie无关，是另一套会话机制

#### [JWT原理]()
1. 用户登录
```
// JWT对用户信息加密至token
const { username } = req.query;
const user={username};
const token=JWT.sign(user,'12345678')
```
2. 展示用户信息(判断用户是否已登录)
需要设置request.Authorization=Bearer+空格+token
```
// JWT将token解密，获得用户信息
const token=auth.split('Bearer ')[1];
console.log(token);
const user=JWT.verify(token,'12345678'); 
```
