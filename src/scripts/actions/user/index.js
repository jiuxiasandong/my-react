
import { Toast } from "antd-mobile";
import axios from "axios";
import store from "../../store";

axios.defaults.baseURL = "http://39.107.78.63:3300/react";
// axios.defaults.baseURL = "http://localhost:3000/react";

export function sendCode() {
    let code = Math.random().toString(36).substr(2, 5).toLowerCase();
    Toast.info('success!!!', 1);
    return {
        type: "sendCode",
        preload: code
    }
}

function test(str, msg) {
    var Reg = /^\w{4,10}$/;
    if (Reg.test(str)) {
        return true;
    } else {
        Toast.info(msg, 1);
        return false;
    }
}

export function submitReg(dispatch, userInfo, history) {
    let code = store.getState().code;
    let count = 0;
    if (!test(userInfo.uname, "用户名4-10位哦")) {
        count++;
    } else {
        if (!test(userInfo.upwd, "密码4-10位哦")) {
            count++;
        } else {
            if (!(userInfo.ucode != "")) {
                count++;
                Toast.info("亲!验证码没输", 1);
            } else {
                if (!(userInfo.ucode == code)) {
                    count++;
                    Toast.info("验证码错误", 1);
                }
            }
        }
    }

    if (count == 0) {
        return axios.post("/reg", userInfo)
            .then(res => {
                if (res.data == "0") {
                    Toast.info('该用户已存在!!!', 1);
                } else if (res.data == "1") {
                    Toast.info('注册成功!!!', 1);
                    history.push('/login');
                }
            })
            .then(() => dispatch({ type: "reg" }))
    } else {
        return {
            type: "reg"
        }
    }
}

export function submitLog(dispatch, userInfo, history) {
    return axios.post("/log", userInfo)
        .then(res => {
            // console.log(res.data)
            if (res.data == "0") {
                Toast.info('该用户不存在!!!', 1);
            } else if (res.data.code == "1") {
                let uid = res.data.uid;
                localStorage.setItem("uid", uid);
                Toast.info('登陆成功!!!', 1);
                history.push('/app/diary');
            } else if (res.data == "2") {
                Toast.info('用户名密码不匹配!!!', 1);
            }
        })
        .then(() => dispatch({ type: "log" }))
}