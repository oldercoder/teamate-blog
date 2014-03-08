var mongodb = require('./db');
var database = require('mongodb');
var dburl = mongodb.blue.url;

function User(user){
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}
module.exports = User;

// 写入用户信息
User.prototype.save = function save(callback){

    // User doc to be insert
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };

    // Open database
    //mongodb.open(function(err, db){
    //database.connect(mongodb.local.url, function(err, db){
    database.connect(dburl, function(err, db){
        if(err){
            return callback(err);
        }
        //read users collection
        db.collection('users', function(err, collection){
            if(err){
                db.close();
                return callback(err);
            }
            collection.ensureIndex('name', {unique: true}, function(err){
                db.close();
                return callback(err);
            }); // 加索引
            collection.insert(user, {safe:true}, function(err, user){
                db.close();
                callback(err, user);
            });
        });
    });

};

// 读用户信息
User.get = function get(username, callback){
    //mongodb.open(function(err, db){
    //database.connect(mongodb.local.url, function(err, db){
    database.connect(dburl, function(err, db){
        if(err){
            return callback(err);
        }

        db.collection('users', function(err, collection){
            if(err){
                db.close();
                return callback(err);
            }
            collection.findOne({name: username}, function(err, doc){
                db.close();
                if(doc){
                    var user = new User(doc);
                    callback(err, user);
                }else{
                    callback(err, null);
                }
            });
        });
    });

};