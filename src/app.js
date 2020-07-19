const express = require("express");
const app = new express();
const bodyParser = require('body-parser');

/**
 * body-parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * 加载/views文件夹里的静态资源
 */
app.use(express.static('views', {
    extensions: ['html','htm']
}));

/**
 * 路由
 * mainRoute 主路由
 * userRoute 用户路由
 */
const mainRoute = require('./route/main.route');
const userRoute = require('./route/user.route');
app.use('/main',mainRoute);
app.use('/user',userRoute);

/**
 * errMiddelWare
 * 处理异常中间件
 * @param Object err 报错信息
 * @param Object reg 接受数据
 * @param Object res 返回数据
 * @param Function next 下一个方法
*/
function errMiddelWare(err, reg, res, next) {
    console.log(err)
    if(err){
        res.json({
            err: 1,
            message: '请求异常'
        })
    }
    next();
}
app.use('*', errMiddelWare);

/**
 * 链接测试
 */
app.listen(8888, ()=> {
    console.log('服务创建成功');
})