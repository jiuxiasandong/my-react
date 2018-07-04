import React, { Component } from "react";
import "../../../styles/page/mine.scss";
import { Link } from "react-router-dom";

export default class Me extends Component{
    render(){
        return(
            <div className="mine">
                <div className="top">
                    <div className="circle iconfont icon-circle"></div>
                    <div className="username">Jiuxia</div>
                    <div>
                        <span>星星</span>
                        <span className="iconfont icon-ai64"></span>
                    </div>
                </div>
                <div className="bottom">
                    <div className="item">
                        <span className="prev-icon iconfont icon-mydata"></span>
                        <div>资料修改</div>
                        <span className="back-icon iconfont icon-right"></span>
                    </div> 
                    <div className="item">
                        <span className="prev-icon iconfont icon-medal"></span>
                        <div>升高高级用户</div>
                        <span className="back-icon iconfont icon-right"></span>
                    </div>
                     <div className="item">
                        <span className="prev-icon iconfont icon-message"></span>
                        <div>系统通知</div>
                        <span className="back-icon iconfont icon-right"></span>
                    </div>
                    <div className="item">
                        <span className="prev-icon iconfont icon-haoping"></span>
                        <div>好评鼓励</div>
                        <span className="back-icon iconfont icon-right"></span>
                    </div>
                     <div className="item">
                        <span className="prev-icon iconfont icon-gengduo"></span>
                        <div>更多功能</div>
                        <span className="back-icon iconfont icon-right"></span>
                    </div>
                    <div className="item">
                        <span className="prev-icon iconfont icon-shezhi"></span>
                        <div>设置</div>
                        <span className="back-icon iconfont icon-right"></span>
                    </div>
                    <div className="item">
                        <span className="prev-icon iconfont icon-fenxiang"></span>
                        <div>分享好友</div>
                        <span className="back-icon iconfont icon-right"></span>
                    </div>
                    <div className="item btn">
                        <Link className="link" to="/login">退出登陆</Link>
                    </div>
                </div>
            </div>
        )
    }
}









