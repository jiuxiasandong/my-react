import React, { Component } from "react";
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from "react-redux";
import Head from "../head";
import { getNewDiary, showIcon } from "../../actions";
import "../../../styles/page/find.scss";

@connect(
    state => (
        { ...state }
    )
)
export default class Find extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        getNewDiary(dispatch);
        dispatch(showIcon(false, false, false));
    }
    render() {
        const { newList } = this.props;
        var Cards = newList.map((item, index) => {
            return (
                <WingBlank size="lg" key={index}>
                    <WhiteSpace size="lg" />
                    <Card style={{ background: item.bg, animationDelay: 60 * index + "ms" }}
                        className="card">
                        <Card.Header
                            title={item.username}
                            thumb={item.imgSrc}
                        // extra={<span>{item.like}</span>}
                        />
                        <Card.Body style={{ color: "#000" }}>
                            <div>{item.text}</div>
                        </Card.Body>
                        <Card.Footer content={item.like}
                            extra={<div>{item.time}</div>}
                            style={{ color: "#aaa", fontSize: "x-small" }}
                            className="iconfont icon-aixin"
                        />
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>
            )
        })
        return (
            <div>
                <Head title="发现" />
                {Cards}
            </div>
        )
    }
}
