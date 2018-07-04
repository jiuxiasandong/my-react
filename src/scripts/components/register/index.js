
import React, { Component } from "react";
import { connect } from "react-redux";
import { sendCode, submitReg } from "../../actions";
import Head from "../head";
import { Link } from "react-router-dom";
import "../../../styles/page/user.scss";

// babel-plugin-import 会帮助你加载 JS 和 CSS
import { Button } from "antd-mobile";
// import { Toast, Button, WingBlank, WhiteSpace, List, Modal } from "antd-mobile";

@connect(
    state => (
        {
            code: state.code,
            ...state
        }
    )
)
export default class Register extends Component {
    getUserInfo = () => {
        const { dispatch, history } = this.props;
        var userInfo = {
            uname: this.refs.uname.value,
            upwd: this.refs.upwd.value,
            ucode: this.refs.ucode.value.toLowerCase(),
        }
        dispatch(submitReg(dispatch, userInfo, history));
    }
    render() {
        const { code, dispatch } = this.props;
        return (
            <div className="user-wrap">
                <div className="diary iconfont icon-diary"></div>
                <h1 className="title">吾记</h1>
                <div className="user">
                    <div className="item">
                        <span className="prev iconfont icon-mine"></span>
                        <input type="text" ref="uname" placeholder="输入昵称" />
                    </div>
                    <div className="item">
                        <span className="prev iconfont icon-mima"></span>
                        <input type="password" ref="upwd" placeholder="输入密码" />
                    </div>
                    <div className="item code">
                        <span className="prev iconfont icon-code"></span>
                        <input type="text" ref="ucode" placeholder="验证码" />
                        <button className="codeBtn" onClick={() => { dispatch(sendCode()) }}>{code ? code : "验证码"}</button>
                    </div>
                    <div className="item">
                        <input type="submit" value="注册" onClick={this.getUserInfo} />
                    </div>
                    <div className="item">
                        <Link to="/login" className="link">已有账号登陆</Link>
                    </div>
                </div>
            </div>
        )
    }
}