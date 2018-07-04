var express = require('express');
var Router = express.Router();
var getDB = require("../db");
var async = require("async");
var ObjectID = require("mongodb").ObjectID;
var isLogin = require("../tools/islogin");
var enc = require('../tools/enc');

//登陆
Router.post('/log', (req, res) => {
    var userInfo = req.body;
    // console.log(userInfo);
    getDB.conn((err, db) => {
        if (err) {
            console.log("数据库错误");
            db.close();
        } else {
            var user = db.collection("user");
            async.waterfall([
                function (callback) {
                    user.find({ uname: userInfo.uname }).toArray((err, result) => {
                        if (err) throw err;
                        // console.log(result);
                        if (result.length > 0) {
                            callback(null, result[0]);//用户名存在
                        } else {
                            callback(null, false);//用户名不存在
                        }
                    })
                },
                function (args, callback) {
                    if (args) {
                        var password = enc(userInfo.upwd);
                        if (args.upwd == password) {
                            callback(null, { code: "1", uname: args.uname, uid: args._id });
                            req.session.userObj = { isLogin: true, uname: userInfo.uname };
                        } else {
                            callback(null, '2');//密码不匹配
                        }
                    } else {
                        callback(null, '0');//用户名不存在
                    }
                }], function (err, result) {
                    if (err) throw err;
                    res.send(result);
                    db.close();
                })

        }
    })
})
//注册
Router.post("/reg", (req, res) => {
    var userInfo = req.body;
    getDB.conn((err, db) => {
        if (err) {
            console.log("数据库错误");
            db.close();
        } else {
            var user = db.collection("user");
            async.waterfall([
                function (callback) {
                    user.find({ uname: userInfo.uname }).toArray((err, result) => {
                        if (err) throw err;
                        console.log(result);
                        if (result.length > 0) {
                            callback(null, true);
                        } else {
                            callback(null, false);
                        }
                    })
                },
                function (args, callback) {
                    if (!args) {
                        var { uname, upwd, ucode } = userInfo;
                        upwd = enc(upwd);
                        user.insert({ uname, upwd, ucode }, (err, result) => {
                            if (err) throw err;
                            console.log(result);
                            callback(null, '1');
                        })
                    } else {
                        callback(null, '0');
                    }
                }], function (err, result) {
                    if (err) throw err;
                    res.send(result);
                    db.close();
                })
        }
    })
})
// 新增diary 
Router.post("/addDiary", (req, res) => {
    var { txt, uid, time } = req.body;
    getDB.conn((err, db) => {
        if (err) {
            console.log("数据库错误");
            db.close();
        } else {
            var diary = db.collection("diary");
            diary.insert({ uid, txt, time, location: "中国" }, (err, result) => {
                if (err) {
                    console.log("数据库错误");
                    res.json({ code: 0 });
                    db.close();
                } else {
                    res.json({ code: 1 });
                    db.close();
                }
            })
        }
    })
})

//获取我的日记列表
Router.post("/getMyDiary", (req, res) => {
    getDB.conn((err, db) => {
        if (err) {
            console.log("数据库错误");
            db.close();
        } else {
            var diary = db.collection("diary");
            var uid = req.body.uid;
            diary.find({ uid: uid }).toArray((err, result) => {
                if (err) {
                    console.log("数据库错误");
                    db.close();
                } else {
                    res.send(result);
                    db.close();
                }
            })
        }
    })
})

//获取最新日记列表
Router.post("/getNewDiary", (req, res) => {
    getDB.conn((err, db) => {
        if (err) {
            console.log("数据库错误");
            db.close();
        } else {
            var findDiary = db.collection("findDiary");
            findDiary.find().toArray((err, result) => {
                if (err) {
                    console.log("数据库错误");
                    db.close();
                } else {
                    res.send(result);
                    db.close();
                }
            })
        }
    })
})

//查询日记
Router.post("/search", (req, res) => {
    getDB.conn((err, db) => {
        if (err) {
            console.log("数据库错误");
            db.close();
        } else {
            var diary = db.collection("diary");
            var { txt } = req.body;
            diary.find({ txt: { $regex: txt, $options: 'i' } }).toArray((err, result) => {
                if (err) {
                    console.log("数据库错误");
                    db.close();
                } else {
                    console.log(result);
                    res.send(result);
                    db.close();
                }
            })
        }
    })
})
//删除日记
Router.post("/deleteItemById", (req, res) => {
    var _id = req.body.id;
    getDB.conn((err, db) => {
        if (err) {
            res.send("数据库错误");
            db.close()
        } else {
            var diary = db.collection("diary");
            async.series([
                function (callback) {
                    diary.remove({ _id: ObjectID.createFromHexString(_id) }, function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            callback(null, "1")
                        }
                    })
                },
                function (callback) {
                    diary.find({}, {}).toArray((err, result) => {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, result);
                        }
                    })
                }],
                function (err, result) {
                    if (err) {
                        res.send("数据库错误");
                        db.close();
                    } else {
                        res.json(result);
                        db.close();
                    }
                })
        }
    });
})

//获取详情列表
Router.post("/getDetail", (req, res) => {
    getDB.conn((err, db) => {
        if (err) {
            console.log("数据库错误");
            db.close();
        } else {
            var diary = db.collection("diary");
            var _id = req.body.id;
            diary.find({ _id: ObjectID.createFromHexString(_id) }).toArray((err, result) => {
                if (err) {
                    console.log("数据库错误");
                    db.close();
                } else {
                    res.send(result);
                    db.close();
                }
            })
        }
    })
})

module.exports = Router;