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

router.get('/list', (reg,res) => {
    dbase.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        res.json({
            err: 0,
            list: result
        })
    });
});
module.exports = router;