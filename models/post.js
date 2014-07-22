var mongodb = require('./db');
var database = require('mongodb');
var dburl = mongodb.blue.url;
//var dburl = mongodb.local.url;

function Post(name, title, post){
    this.name = name;
    this.title = title;
    this.post = post;
}
module.exports = Post;

Post.prototype.save = function save(callback){
    var date = new Date();
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + '-' + (date.getMonth() +1),
        day: date.getFullYear() + '-' + (date.getMonth() +1) + '-' + date.getDate(),
        minute: date.getFullYear() + '-' + (date.getMonth() +1) + '-' + date.getDate() +' '+
            date.getHours() + ':' + (date.getMinutes()<10? '0' + date.getMinutes():date.getMinutes())
    };

    var post = {
        name: this.name,
        time: time,
        title: this.title,
        post: this.post
    };

    // open database
   // mongodb.open(function(err, db){
    //database.connect(mongodb.local.url, function(err, db){
    database.connect(dburl, function(err, db){
        if(err){
            return callback(err)
        }
        //read posts collection
        db.collection('posts', function (err, collection){
            if(err){
                db.close();
                return callback(err);
            }
            //insert doc into collection
            collection.ensureIndex('user', function(err){
                db.close();
                return callback(err);
            });
            collection.insert(post, {safe:true}, function(err, post){
                db.close();
                callback(err, post);
           });
        });
    });
};

Post.get = function get(username, callback){

    //mongodb.open(function(err, db){
    //database.connect(mongodb.local.url, function(err, db){
    database.connect(dburl, function(err, db){
        if(err){
            return callback(err)
        }

        //read collection
        db.collection('posts', function(err, collection){
            if(err){
                db.close();
                return callback(err);
            }
            //query doc with 'user=username', if null means all
            var query={};
            if(username){
                query.user = username;
            }
            collection.find(query).sort({time: -1}).toArray(function (err, docs){
                db.close();
                if(err){
                    return callback(err, null);
                }
                callback(null, docs);
            });
        });
    });
};