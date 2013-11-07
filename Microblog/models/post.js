var mongoose=require('mongoose');
var db = require('./db');
var Schema=mongoose.Schema;
var PostSchema=new Schema({
    userName : {type:String,index:true},
    post : String,
    time:{type:Date,default:Date.now()}
});
db.model('Post',PostSchema);
var Post=db.model('Post');

function Posts(username,post,time){
    // 用于存储post信息
    this.username=username;
    this.post=post;
    this.time=time;
}

exports.postSave=function(posts,callback){
    var newPost=new Post();
    newPost.userName=posts.user.name;
    newPost.post=posts.post;
    newPost.save(function(err){
        if(err){
          return  callback(err);
        }
        callback(null);
    })
};

exports.userPostFind=function(userName,callback){
    Post.find({userName:userName}).sort('-_id').exec(function(err,docs){
         if(err){
            return callback(err,null);
         }
        var posts=[];
        docs.forEach(function(doc)
        {
            var post=new Posts(doc.userName,doc.post,doc.time);
            posts.push(post);
        });
         callback(null,posts);
    })
};

exports.allPostFind=function(callback){
    Post.find().sort('-_id').exec(function(err,docs){
        if(err){
            return callback(err,null);
        }
        var posts=[];
        docs.forEach(function(doc)
        {
            var post=new Posts(doc.userName,doc.post,doc.time);
            posts.push(post);
        });
        callback(null,posts);
    })
};