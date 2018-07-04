import { Toast } from "antd-mobile";
import axios from "axios";
var $ = require("../../utils/jquery-1.10.1.min.js");

axios.defaults.baseURL = "http://39.107.78.63:3300/react";
// axios.defaults.baseURL = "http://localhost:3000/react";

export function getMydiary(dispatch) {
    let uid = localStorage.getItem("uid");
    return axios.post("/getMydiary", { uid })
        .then(res => res.data)
        .then(data => dispatch({ type: "getMydiary", data }))
}

export function getTex() {
    var textInput = document.getElementById("myMsg")
    var txt = textInput.value;
    return {
        type: "getTex",
        txt
    }
}
//新增日记
export function addDiary(dispatch, txt) {
    var uid = localStorage.getItem("uid");
    //插入时间
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var day = date.getDate();
    day = day < 10 ? '0' + day : day;
    var hours = date.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var secends = date.getSeconds();
    secends = secends < 10 ? '0' + secends : secends;
    var week = date.getDay();
    var weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    week = weekList[week];
    var time = { year, month, day, hours, minutes, secends, week };
    if (txt != "") {
        return axios.post("/addDiary", { txt, uid, time })
            .then(res => {
                if (res.data.code == 0) {
                    Toast.info('fail!!!', 1);
                } else if (res.data.code == 1) {
                    Toast.info('success!!!', 1);
                    window.history.go(-1);
                }
            })
            .then(() => dispatch({ type: "addDiary" }))
    } else {
        Toast.info('fail!!!', 1);
        return { type: "addDiary" }
    }
}
//获取最新列表
export function getNewDiary(dispatch) {
    Toast.loading('Loading...', 0.5);
    return axios.post("/getNewDiary")
        .then(res => res.data)
        .then(data => dispatch({ type: "getNewDiary", data }))
}
//searchBar
var flag = false;
export function showSearchBar() {
    $("#search").val("");
    var h = $(".head").height()
    h = !flag ? h : -h;
    $(".searchBar").stop().animate({ top: h }, () => {
        flag = !flag;
    });
}
//改变头部图标显示
export function showIcon(s1, s2, s3) {
    return {
        type: "showIcon",
        indexShow: s1,
        addShow: s2,
        detailShow: s3
    }
}
//删除图标显示
var show = false;
export function showDel(index) {
    var L = -50;
    L = !show ? L : 0;
    $(".myList").eq(index).stop().animate({ left: L }, function () {
        if (!show) {
            $(this).find(".delete").show();
        } else {
            $(this).find(".delete").hide();
        }
        show = !show;
    })
}
//搜索
export function search(dispatch, txt) {
    return axios.post("/search", { txt })
        .then(res => {
            $(".searchBar").stop().animate({ top: 0 }, () => {
                flag = !flag;
            });
            return res.data;
        })
        .then(data => dispatch({ type: "search", data }))
}
//删除
export function deleteItemById(dispatch, id) {
    return axios.post("/deleteItemById", { id })
        .then(res => res.data[1])
        .then(data => dispatch({ type: "deleteItemById", data }))
}

//详情
export function getDetail(dispatch, id) {
    return axios.post("/getDetail", { id })
        .then(res => res.data)
        .then(data => dispatch({ type: "getDetail", data }))
}

