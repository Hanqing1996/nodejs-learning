// 命令行输入:node models/in_memo/user.js

const users=[] //程序启动时,users被初始化为[],在users的调用过程中,users的值会改变

class User{
    constructor(firstname,lastname,age){
        this.firstname=firstname;
        this.lastname=lastname;
        this.age=age;
    }


    // 实例方法，先new一个实例u再u.getName()
    getName(){
        return `${this.firstname} ${this.lastname}`;
    }

    // 静态方法，直接User.()
    static insert(firstname,lastname,age){
        const u=new User(firstname,lastname,age);
        User.users.push(u);
        return u;
    }

    static getOneByName(firstname,lastname,age){
        const u=User.users.find(u=>u.firstname===firstname&&u.lastname===u.lastname);
        return u;
    }

    static list(query){
        return User.users;
    }

    static get ['users'](){
        return users;
    }
}

module.exports=User;

// 测试，只在程序启动时执行一次
/*
console.log(User.list());
console.log(User.insert('ke','yang',12));
console.log(User.list());

console.log(User.insert('lao','yang',12));
console.log(User.list());

console.log(User.getOneByName('lao','yang',12));
*/

