const express =  require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const mongodbUrl = 'mongodb://localhost:27017/runoob';
var dbase = null;
MongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    dbase = db.db("runoob");
    dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
    });
});

/**
 * /login 验证登录
 * GET
 * @param {String} username 用户名
 * @param {String} password 用户密码
 */
router.get('/login', (reg,res) => {
    let {username,password} = reg.query;
    let resData = {};
    dbase.collection("site"). find({"username": username}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) {
            res.json({ err: 1, msg: '请求异常'})
            return;
        }
        if (!result.length) {
            res.json({err: 1, msg: '用户名不存在'})
            return;
        }
        if (result[0].password != password) {
            res.json({ err: 1, msg: '密码不正确'})
            return;
        }
        res.json({
            err: 0,
            msg: '登录成功'
        })
    });
});

/**
 * /reg 验证注册
 * POST
 * @param {String} username 用户名
 * @param {String} password 用户密码
 */
router.post('/reg', (reg,res) => {
    console.log(reg.body);
    let {username,password} = reg.body;
    var myobj = { "username": username, "password": password};
    dbase.collection("site").insertOne(myobj, function(err, result) {
        if (err) {
            res.json({ err: 1, msg: '请求异常'});
            return;
        }
        res.json({ err: 0, msg: '注册成功'});
    });
});

module.exports = router;