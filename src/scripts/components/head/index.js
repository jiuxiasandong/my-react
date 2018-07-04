import React, { Component } from "react";
import { connect } from "react-redux";
import { addDiary, showSearchBar, changeShow, search } from "../../actions";
import { Link, Route } from "react-router-dom";
import { Calendar } from 'antd-mobile';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
const now = new Date();

@connect(
    state => (
        { ...state }
    )
)
export default class Head extends Component {
    originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;
    constructor(props) {
        super(props);
        this.state = {
            config: { type: 'one' },
            dateShow: false,
            enterDirection: "horizontal",
            initalMonths: 1,
        };
    }
    goCalendar = () => {
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
        this.setState({
            dateShow: true,
        });
    }
    onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            dateShow: false
        });
    }
    onConfirm = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            dateShow: false
        });
    }
    render() {
        const { dispatch, title, indexShow, addShow, detailShow, txt } = this.props;
        return (
            <div className="head">
                <header>
                    {/* 显示日历 */}
                    <div className="diary iconfont icon-rili"
                        style={{ display: indexShow ? "block" : "none" }}
                        onClick={this.goCalendar}
                    ></div>
                    {/* 显示searchBar */}
                    <div className="search iconfont icon-sousuo"
                        style={{ display: indexShow ? "block" : "none" }}
                        onClick={showSearchBar}
                    ></div>
                    {/* 新增日记 */}
                    <Link className="edit iconfont icon-xie" to="/diary/add"
                        style={{ display: indexShow ? "block" : "none" }}
                    ></Link>
                    {/* <div className="arrow iconfont icon-arrows"
                        style={{ display: !show ? "block" : "none" }}
                    ></div> */}
                    {/* 回退Back */}
                    <Link className="back iconfont icon-left" to="app/diary"
                        style={{ display: addShow ? "block" : "none" }}>
                        <span>取消</span>
                    </Link>

                    {/* 提交日记 */}
                    <div className="finish iconfont icon-finish"
                        style={{ display: addShow ? "block" : "none" }}
                        onClick={() => { addDiary(dispatch, txt) }}
                    >
                    </div>
                    {/* 修改日记 */}
                    <div className="update iconfont icon-xie"
                        style={{ display: detailShow ? "block" : "none" }}
                    // onClick={() => { update(dispatch, txt) }}
                    >
                    </div>
                    <Link className="goback iconfont icon-left" to="/app/diary"
                        style={{ display: detailShow ? "block" : "none" }}>
                        <span>返回</span>
                    </Link>
                    {/* 头部标题 */}
                    <span>{title}</span>
                </header>
                {/* 日历插件 */}
                <Calendar
                    {...this.state.config}
                    enterDirection={this.state.enterDirection}
                    initalMonths={this.state.initalMonths}
                    visible={this.state.dateShow}//显示日历
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}//确认后的回调
                    defaultDate={now} //默认时间
                    minDate={new Date(+now - 5184000000)}
                    maxDate={new Date(+now + 31536000000)}
                />
                {/* searchBar */}
                <div className="searchBar">
                    <div className="search-icon iconfont icon-sousuo"
                        onClick={() => {
                            let searchtxt = this.refs.search.value;
                            search(dispatch, searchtxt)
                        }}
                    ></div>
                    <input type="text" id="search" ref="search" placeholder="请输入关键字" />
                </div>
            </div>
        )
    }
}

Head.propTypes = {
    title: React.PropTypes.string.isRequired,
}