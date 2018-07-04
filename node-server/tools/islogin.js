module.exports = (req,res) => {
    return new Promise((suc, err) => {
        var userObj = req.session.userObj;
        console.log(2222);
        var isLogin = userObj ? true : false;
        var uname = userObj ? userObj.uname : null;
        var obj = {
            'isLogin': isLogin,
            'uname': uname
        }
        suc(obj);
    })
}