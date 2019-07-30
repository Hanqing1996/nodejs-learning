#### z
* [教程](https://xiedaimala.com/tasks/11ad5683-7e18-4883-879d-8425e6a6ceb7/video_tutorials/d044ad5f-102b-4417-821c-015675d104c8)
* 作用
> 在目录之间快速切换(没去过的目录不能跳转)
* 用法
```
. ~/.zshrc
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

* HTTP头部组成：
1. 第一行:方法、路径、协议版本，使用空格分割
```
GET /user HTTP/1.1
```
2. 第二行开始:内容
* HTTP头中常见键值对：
1. Host 指明请求的地址
2. Server 服务器信息
3. Content-Type 请求体的格式,如 xxx/www-url-encoded-form-data application/json
4. Accept: 接受的返回格式
5. Accept-Encoding：接受的请求编码
6. Accept-Language：接受的语言
7. Pragma：兼容http1.0的缓存
8. Cache-Control:缓存策略
9. Via:走过的服务器链路信息
* Response头第一行： 
> 协议 状态码 状态描述 如 HTTP/1.1 200 OK
* 返回码：
2. 2xx 请求成功 200成功 201创建 202接受 203代理 206部分处理
3. 3XX 重定向 302找到，重定向 304未修改
4. 4xx 客户端错误 400请求内容错误 401无权限 403禁止访问 404你懂的
5. 5xx 服务器错误 500服务器炸了 502网关炸了 503炸几分钟 504超时

#### HTTP体
* HTTP头部和HTTP体中间：一个空行 
* HTTP体放置真正传输的内容


#### 补充
* 请求体的格式通常由请求头里的content-type指定，可能会很大

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
#### express
* 安装
```
npm i -g express-generator
```
* 生成项目what_i_love
```
express --view=ejs what_i_love
```
* 启动
```
node bin/www
```
* 安装与运行express_demo
初始化npm
```
npm init
```
安装express
```
npm i --save express
```
运行index.js
```
node index.js
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

#### 网关
负责接收请求，并且把请求分发到处理业务的不同逻辑上去。

#### req.query与req.body的区别
* req.query在url里，位于HTTP请求头的第一行。而req.body在body里，位于HTTP请求体中
* 在express中req.query可以直接访问。而访问req.body需要先调body-parser

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

#### express文件目录
* public:静态文件目录
* bin/www:启动入口
* app.js:文件配置
* views:渲染目录

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

#### mongodb的安装，运行
* [下载地址](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials)
* [补充教程](https://cloud.tencent.com/developer/ask/197392)
* 创建数据库实例
mongo_demo为目录，其路径可由pwd命令获知
```
mkdir mongo_demo
mongod --dbpath /home/zhq/nodejs-learning/mongo_demo
```
* 进入mongo shell
```
mongo
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
* 删除users表
```
db.users.remove({})
```
* 查找当前数据库中所有的表
```
show collections
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
#### mongodb记录操作(改)
* 将users表中name为'zhq'的一行数据的age改为19
```
db.users.update({name:'zhq'},{name:'zhq',age:19})
```
#### mongodb记录操作(查)
* 查看users表所有记录
```
db.users.find().pretty()
```
* 查找users表中age为1234的那行数据
```
db.users.find({age:1234})
```
* 查找users表中age大于13,小于29，city值为Hangzhou的那行数据
```
db.users.find({age:{$gt:13，$lt:29}},city:'Hangzhou')
//gte:大于等于；lte:小于等于
```
* 查找users表中不含age属性的数据
```
db.users.find({age: {$exists:false}  })
```