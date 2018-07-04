
import React, { Component } from "react";
import { connect } from "react-redux";
import { submitLog } from "../../actions";
import { Link } from "react-router-dom";
import Head from "../head";
import "../../../styles/page/user.scss";

@connect(
    state => (
        { ...state }
    )
)
export default class Login extends Component {
    getUserInfo = () => {
        const { dispatch, history } = this.props;
        var userInfo = {
            uname: this.refs.uname.value,
            upwd: this.refs.upwd.value,
        }
        dispatch(submitLog(dispatch, userInfo, history));
    }
    render() {
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
                    <div className="item">
                        <input type="submit" value="登陆" onClick={this.getUserInfo} />
                    </div>
                    <div className="item">
                        <Link to="/register" className="link">注册账号</Link>
                        <Link to="/register" className="link">忘记密码</Link>
                    </div>
                </div>
            </div>
        )
    }
}