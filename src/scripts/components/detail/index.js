import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Toast } from "antd-mobile";
import Head from "../head";
import { getDetail, showIcon } from "../../actions";
import "../../../styles/page/detail.scss";

@connect(
    state => (
        { ...state }
    )
)
export default class Detail extends Component {
    componentWillMount() {
        const { match, dispatch } = this.props;
        var id = match.params.id
        dispatch(getDetail(dispatch, id));
        dispatch(showIcon(false, false, true));
    }
    render() {
        const { detailList, dispatch } = this.props;
        var items = detailList.map((item, index) => {
            return (
                <div key={index}>
                    <div className="detailList" id={detailList._id}>
                        <div className="time">
                            <span className="year">{item.time.year}.{item.time.month}.{item.time.day}</span>
                            <span className="hour">{item.time.hours}:{item.time.minutes}</span>
                            <span className="week">{item.time.week}</span>
                        </div>
                        <div className="location">
                            <span className="iconfont icon-location"></span>
                            <span>{item.location}</span>
                        </div>
                        <div className="tex">{item.txt}</div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <Head title="编辑" />
                {items}
                <div className="skip">
                    <span className="icon-item iconfont icon-arrow-left"></span>
                    <span className="icon-item iconfont icon-fenxiang"></span>
                    <span className="icon-item iconfont icon-arrow-right"></span>
                </div>
            </div>
        )
    }
}

