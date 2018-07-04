
var express = require("express");
var cookieParser = require('cookie-parser');   // 方便操作cookies
var bodyParser = require('body-parser');   //  获取 请求的参数   post
var session = require("express-session");
var app = express();
var getDB = require("./db");
// var vue = require("./vue");
var react = require("./react");
var host = "0.0.0.0";

var port = 3000;

// 处理跨域方法 jsonp
app.all('*', function (req, res, next) {
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // form 表单提交 
app.use(cookieParser());
app.use(session({
    secret : "abcc", //生成签名用的字符串
    name : "test", //发送到客户端的key名称
    cookie : {maxAge : 1000000},//设置session有效时长为5分钟
    resave : false,
    saveUninitialized : true
}));

// app.use("/vue", vue); 
app.use("/react", react);
app.get('/test',(req,res)=>{
    res.send("success")
})

app.listen(port, host, () => {
    console.log(`node server is running at http://${host}:${port}`)
});