var mongoose=require('mongoose');
var db=require('./db');
var Schema=mongoose.Schema;
var UserSchema=new Schema({
    name : String,
    password : String
});
db.model('User',UserSchema);
var User=db.model('User');
exports.userSave=function(user,callback){
    var newUser=new User();
    newUser.name=user.name;
    newUser.password=user.password;
    newUser.save(function(err){
        if(err){
         return callback(err);
        }
        callback(null);
    })

};
exports.userFind=function(userName,callback){
    User.findOne({name:userName},function(err,doc){
        if(err){
         return callback(err,null);
        }
        callback(null,doc); // 用户名如果已经存在，将在调用函数内赋值err
    })

};